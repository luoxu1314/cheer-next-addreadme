import { Check, Smartphone, Zap, Shield, Clock, Users } from "lucide-react";
import { homeConfig } from "@/lib/config/home.config";

const features = [
  {
    icon: Smartphone,
    title: homeConfig.features.items[0].title,
    description: homeConfig.features.items[0].description
  },
  {
    icon: Smartphone,
    title: homeConfig.features.items[1].title,
    description: homeConfig.features.items[1].description
  },
  {
    icon: Zap,
    title: homeConfig.features.items[2].title,
    description: homeConfig.features.items[2].description
  },
  {
    icon: Shield,
    title: homeConfig.features.items[3].title,
    description: homeConfig.features.items[3].description
  },
  {
    icon: Users,
    title: homeConfig.features.items[4].title,
    description: homeConfig.features.items[4].description
  },
  {
    icon: Check,
    title: homeConfig.features.items[5].title,
    description: homeConfig.features.items[5].description
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {homeConfig.features.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {homeConfig.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 bg-gradient-to-r from-secondary/30 to-secondary/30 dark:from-secondary/50 dark:to-secondary/50 rounded-2xl p-8 border border-border/50">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {homeConfig.features.additionalTitle}
              </h3>
              <ul className="space-y-3">
                {homeConfig.features.additionalItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-chart-4 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">
                  {homeConfig.features.freeText}
                </div>
                <p className="text-muted-foreground">
                  {homeConfig.features.freeDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}