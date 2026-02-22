import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
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

        {/* Upload preview mockup */}
        <div className="mt-16 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="upload-zone rounded-2xl p-12 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center animate-float">
              <ArrowRight className="w-8 h-8 text-primary-foreground rotate-[-90deg]" />
            </div>
            <p className="text-foreground font-medium">Drop your image here or click to browse</p>
            <p className="text-muted-foreground text-sm">JPG, PNG, WEBP • Max 10MB • Up to 5000×5000px</p>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mt-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          ✦ 5 free images daily • No signup required to try
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
