import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <div className="gradient-primary rounded-3xl p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Ready to remove backgrounds?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Start with 5 free images daily. No credit card required.
            </p>
            <a href="/register">
              <button className="bg-primary-foreground text-accent font-semibold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-opacity">
                Get Started Free
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
