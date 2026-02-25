import { useState, useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Upload, X, Download, Loader2, CheckCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { saveImage, listProcessedImages } from "@/lib/storage";
import { toast } from "@/components/ui/sonner";

type ProcessingState = "idle" | "uploading" | "processing" | "done" | "error";

const UploadPage = () => {
  const WEBHOOK_URL = "https://soulfull.app.n8n.cloud/webhook/bg-remover";
  const loc = useLocation() as { state?: { file?: File } };
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [state, setState] = useState<ProcessingState>("idle");
  const [savedId, setSavedId] = useState<string | null>(null);
  const [savedImages, setSavedImages] = useState<Array<{ id: string; name: string; url: string; type: string }>>([]);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const anotherInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(f.type)) return;
    if (f.size > 10 * 1024 * 1024) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setState("idle");
    setResultUrl(null);
  }, []);

  useEffect(() => {
    const f = loc.state?.file;
    if (f) handleFile(f);
  }, [loc, handleFile]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === "file" && item.type.startsWith("image/")) {
          const f = item.getAsFile();
          if (f) handleFile(f);
          break;
        }
      }
    },
    [handleFile]
  );

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === "file" && item.type.startsWith("image/")) {
          const f = item.getAsFile();
          if (f) handleFile(f);
          break;
        }
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [handleFile]);

  useEffect(() => {
    listProcessedImages().then((records) => {
      const mapped = records.map((r) => ({
        id: r.id,
        name: r.name,
        type: r.type,
        url: URL.createObjectURL(r.data),
      }));
      setSavedImages(mapped);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setState("idle");
    setResultUrl(null);
  };

  const handleProcess = async () => {
    if (!file) {
      toast("No image selected");
      return;
    }
    try {
      setState("uploading");
      const form = new FormData();
      form.append("file", file, file.name);
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: form,
      });
      if (!res.ok) {
        setState("error");
        let msg = `Webhook error ${res.status}`;
        try {
          const t = await res.text();
          if (t) msg = `${msg}: ${t.slice(0, 200)}`;
        } catch {
          toast("Failed to read error body");
        }
        toast(msg);
        return;
      }
      setState("processing");
      let url: string | undefined;
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        const data = await res.json();
        if (typeof data?.url === "string") url = data.url;
      } else {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          if (typeof data?.url === "string") url = data.url;
        } catch {
          url = undefined;
        }
      }
      if (!url) {
        setState("error");
        toast("Invalid webhook response");
        return;
      }
      url = url.trim().replace(/^`+|`+$/g, "").replace(/^"+|"+$/g, "").replace(/^'+|'+$/g, "");
      setResultUrl(url);
      try {
        const r2 = await fetch(url);
        const b2 = await r2.blob();
        const name2 = url.split("/").pop() || `result-${Date.now()}`;
        const f2 = new File([b2], name2, { type: b2.type || "image/png" });
        const id2 = await saveImage(f2, true);
        setSavedId(id2);
        const records = await listProcessedImages();
        const mapped = records.map((r) => ({
          id: r.id,
          name: r.name,
          type: r.type,
          url: URL.createObjectURL(r.data),
        }));
        setSavedImages(mapped);
      } catch {
        toast("Failed to save processed image");
      }
      setState("done");
      toast("Image sent to webhook");
    } catch {
      setState("error");
      toast("Failed to send image");
    }
  };

  const handleDownload = async () => {
    const src = resultUrl || preview;
    if (!src) return;
    try {
      const resp = await fetch(src);
      const blob = await resp.blob();
      const a = document.createElement("a");
      const href = URL.createObjectURL(blob);
      a.href = href;
      const nameFromUrl = src.split("/").pop() || "result";
      a.download = nameFromUrl;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(href);
    } catch {
      toast("Failed to download");
    }
  };
  const handleUploadAnother = () => {
    anotherInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          <input
            ref={anotherInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleChange}
          />
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Remove <span className="gradient-text">Background</span>
            </h1>
            <p className="text-muted-foreground">Upload an image and get a transparent background in seconds</p>
          </div>

          {!file ? (
            <label
              className={`upload-zone rounded-2xl p-16 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${
                dragActive ? "border-primary bg-primary/10 scale-[1.02]" : ""
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onPaste={handlePaste}
              tabIndex={0}
            >
              <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleChange} />
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center animate-float">
                <Upload className="w-7 h-7 text-primary-foreground" />
              </div>
              <p className="text-foreground font-semibold text-lg">Drop your image here or click to browse</p>
              <p className="text-muted-foreground text-sm">JPG, PNG, WEBP • Max 10MB</p>
            </label>
          ) : (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-muted-foreground">Original</span>
                    <button onClick={handleRemove} className="text-muted-foreground hover:text-destructive transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="aspect-square bg-muted rounded-xl overflow-hidden flex items-center justify-center">
                    {preview && <img src={preview} alt="Original" className="max-w-full max-h-full object-contain" />}
                  </div>
                  {savedId && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      Saved ID: {savedId}
                    </div>
                  )}
                </div>

                <div className="glass-card rounded-2xl p-4">
                  <span className="text-sm font-medium text-muted-foreground mb-3 block">Result</span>
                  <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center" style={{
                    background: state === "done" && (resultUrl || preview)
                      ? "repeating-conic-gradient(hsl(var(--muted)) 0% 25%, transparent 0% 50%) 0 0 / 20px 20px"
                      : "hsl(var(--muted))"
                  }}>
                    {state === "done" && (resultUrl || preview) ? (
                      <img src={resultUrl || preview || ""} alt="Result" className="max-w-full max-h-full object-contain" />
                    ) : state === "processing" || state === "uploading" ? (
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <span className="text-sm text-muted-foreground">
                          {state === "uploading" ? "Uploading..." : "Removing background..."}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Result will appear here</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                {state === "idle" && (
                  <button onClick={handleProcess} className="gradient-primary px-8 py-3 rounded-xl text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Remove Background
                  </button>
                )}
                {state === "done" && (
                  <button onClick={handleDownload} className="gradient-primary px-8 py-3 rounded-xl text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Result
                  </button>
                )}
                {state === "done" && (
                  <button onClick={handleUploadAnother} className="px-8 py-3 rounded-xl font-semibold border-2 border-border text-foreground hover:bg-muted transition-colors">
                    Upload Another
                  </button>
                )}
              </div>
              {state === "done" && (
                <div className="flex items-center justify-center gap-2 text-primary">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Background removed successfully!</span>
                </div>
              )}
              {savedImages.length > 0 && (
                <div className="glass-card rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-muted-foreground">Saved</span>
                    <span className="text-xs text-muted-foreground">{savedImages.length}</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {savedImages.map((img) => (
                      <button
                        key={img.id}
                        className="aspect-square bg-muted rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                        onClick={() => {
                          setPreview(img.url);
                          setState("done");
                        }}
                        title={img.name}
                      >
                        <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UploadPage;
