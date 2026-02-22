import { useState, useCallback } from "react";
import { Upload, X, Download, Loader2, CheckCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type ProcessingState = "idle" | "uploading" | "processing" | "done" | "error";

const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [state, setState] = useState<ProcessingState>("idle");

  const handleFile = useCallback((f: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(f.type)) return;
    if (f.size > 10 * 1024 * 1024) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setState("idle");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setState("idle");
  };

  const handleProcess = () => {
    setState("uploading");
    setTimeout(() => setState("processing"), 800);
    setTimeout(() => setState("done"), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
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
                </div>

                <div className="glass-card rounded-2xl p-4">
                  <span className="text-sm font-medium text-muted-foreground mb-3 block">Result</span>
                  <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center" style={{
                    background: state === "done" && preview
                      ? "repeating-conic-gradient(hsl(var(--muted)) 0% 25%, transparent 0% 50%) 0 0 / 20px 20px"
                      : "hsl(var(--muted))"
                  }}>
                    {state === "done" && preview ? (
                      <img src={preview} alt="Result" className="max-w-full max-h-full object-contain" />
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
                  <button className="gradient-primary px-8 py-3 rounded-xl text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Result
                  </button>
                )}
              </div>
              {state === "done" && (
                <div className="flex items-center justify-center gap-2 text-primary">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Background removed successfully!</span>
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
