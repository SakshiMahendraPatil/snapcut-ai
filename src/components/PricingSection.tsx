import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for trying out",
    features: ["5 images per day", "Standard quality", "JPG, PNG, WEBP", "24h file retention"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    description: "For professionals & teams",
    features: ["Unlimited images", "HD quality output", "Priority processing", "API access", "Bulk processing", "24/7 support"],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Credits",
    price: "₹99",
    period: "/50 credits",
    description: "Pay as you go",
    features: ["50 image credits", "HD quality output", "No expiry", "API access"],
    cta: "Buy Credits",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Start free. Upgrade when you need more. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 relative transition-all duration-300 hover:shadow-lg ${
                plan.popular
                  ? "gradient-primary text-primary-foreground shadow-xl scale-105"
                  : "glass-card"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className={`font-display font-bold text-xl mb-1 ${plan.popular ? "" : "text-foreground"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-4 ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {plan.description}
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-display font-bold">{plan.price}</span>
                <span className={`text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/register">
                <button
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? "bg-primary-foreground text-accent hover:opacity-90"
                      : "gradient-primary text-primary-foreground hover:opacity-90 shadow-md shadow-primary/20"
                  }`}
                >
                  {plan.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
