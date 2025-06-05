import { Code, Cloud, Shield, TrendingUp, Smartphone, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ServicesSection() {
  const services = [
    {
      icon: Code,
      title: "Software Development",
      description: "Custom software solutions tailored to your business needs with cutting-edge technologies.",
      color: "bg-primary"
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services for modern businesses.",
      color: "bg-secondary"
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your digital assets and data.",
      color: "bg-accent"
    },
    {
      icon: TrendingUp,
      title: "Data Analytics",
      description: "Transform your data into actionable insights with advanced analytics solutions.",
      color: "bg-primary"
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android platforms.",
      color: "bg-secondary"
    },
    {
      icon: Users,
      title: "IT Consulting",
      description: "Strategic technology consulting to optimize your IT infrastructure and processes.",
      color: "bg-accent"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Our Services</h2>
          <p className="text-lg text-neutral-900 max-w-2xl mx-auto">
            Comprehensive technology solutions designed to accelerate your business growth and digital transformation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="hover-lift shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-neutral-50">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center mb-6`}>
                    <Icon className="text-2xl text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">{service.title}</h3>
                  <p className="text-neutral-900 mb-6">{service.description}</p>
                  <button className="text-primary font-semibold hover:text-blue-800 transition-colors">
                    Learn More →
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
