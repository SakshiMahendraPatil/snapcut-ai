import { Upload, Zap, Shield, Image, CreditCard, Code } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Drag & Drop Upload",
    description: "Simply drag your image or browse files. Supports JPG, PNG, and WEBP up to 10MB.",
  },
  {
    icon: Zap,
    title: "AI Processing in <5s",
    description: "Our AI removes backgrounds with pixel-perfect precision in under 5 seconds.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Images are auto-deleted after 24 hours. No permanent storage. HTTPS everywhere.",
  },
  {
    icon: Image,
    title: "High Resolution",
    description: "Support for images up to 5000×5000 pixels with no quality loss.",
  },
  {
    icon: CreditCard,
    title: "Flexible Plans",
    description: "Start free with 5 images/day. Upgrade to Pro for unlimited processing.",
  },
  {
    icon: Code,
    title: "Developer API",
    description: "Integrate background removal into your apps with our simple REST API.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Everything you need to <span className="gradient-text">remove backgrounds</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful AI, simple interface, enterprise-grade security. Background removal made effortless.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card rounded-2xl p-6 hover:shadow-md transition-all duration-300 group"
            >
              <div className="gradient-primary w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
