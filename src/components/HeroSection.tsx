import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useCallback, useRef, useState } from "react";

const HeroSection = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const handleFile = useCallback(
    (f: File) => {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(f.type)) return;
      if (f.size > 10 * 1024 * 1024) return;
      navigate("/upload", { state: { file: f } });
    },
    [navigate]
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };
  const handlePaste = (e: React.ClipboardEvent) => {
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
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          AI-Powered Background Removal
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 animate-fade-in max-w-4xl mx-auto leading-tight">
          Remove backgrounds{" "}
          <span className="gradient-text">instantly</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Upload your image, get a clean transparent background in seconds.
          No design skills needed. Powered by advanced AI.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Link to="/upload">
            <button className="gradient-primary px-8 py-4 rounded-xl text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity shadow-xl shadow-primary/25 flex items-center gap-2">
              Remove Background Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <Link to="/api-docs">
            <button className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-border text-foreground hover:bg-muted transition-colors">
              View API Docs
            </button>
          </Link>
        </div>

        {/* Upload preview */}
        <div className="mt-16 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <label
            className={`upload-zone rounded-2xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${
              dragActive ? "border-primary bg-primary/10 scale-[1.02]" : ""
            }`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onPaste={handlePaste}
            tabIndex={0}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleChange}
            />
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center animate-float">
              <ArrowRight className="w-8 h-8 text-primary-foreground rotate-[-90deg]" />
            </div>
            <p className="text-foreground font-medium">Drop your image here or click to browse</p>
            <p className="text-muted-foreground text-sm">JPG, PNG, WEBP • Max 10MB • Up to 5000×5000px</p>
          </label>
        </div>

        <p className="text-muted-foreground text-sm mt-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          ✦ 5 free images daily • No signup required to try
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
