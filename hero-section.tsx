import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const heroContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().regex(/^[\+]?[0-9\s\-\(\)]{10,15}$/, "Please enter a valid mobile number"),
  query: z.string().min(10, "Please provide more details")
});

type HeroContactFormData = z.infer<typeof heroContactSchema>;

export default function HeroSection() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<HeroContactFormData>({
    resolver: zodResolver(heroContactSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      query: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: HeroContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      form.reset();
      setLocation("/thank-you");
    },
    onError: (error: any) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: HeroContactFormData) => {
    contactMutation.mutate(data);
  };

  const benefits = [
    "As your dedicated technology partner, Agency ensures swift, accurate project delivery, a critical step since complex implementations cannot be completed without expert guidance",
    "Digital transformation is a mandatory requirement under modern business standards and must be renewed with cutting-edge solutions",
    "Want to scale your business with Technology? Click here for Expert Assistance",
    "Expert Technology Solutions - We help businesses worldwide implement complete and maintainable tech solutions with expert support",
    "Consulting Services - According to industry standards, modern businesses are required to leverage technology for competitive advantage"
  ];

  return (
    <section id="home" className="teal-gradient-bg py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-lg font-semibold text-white mb-2">Quality and Innovation Excellence Services for Modern Businesses</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-xl p-8 border-t-4 border-primary">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Get in touch with our team...</h3>
              <p className="text-gray-600">
                Submit your details and one of our Technology Executives will call you to discuss your business needs...
              </p>
            </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Name" 
                            className="border-gray-300 focus:border-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Email" 
                            className="border-gray-300 focus:border-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Phone No." 
                            className="border-gray-300 focus:border-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Your message"
                            className="border-gray-300 focus:border-primary resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-blue-800 font-semibold py-3 rounded"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Get Free Consultation"
                    )}
                  </Button>
                </form>
              </Form>
          </div>

          {/* Service Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Technology Solutions & Digital Transformation Services
              </h1>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="inline-flex items-center bg-orange-100 px-4 py-2 rounded-full">
                <Star className="w-4 h-4 text-orange-500 mr-2" />
                <span className="text-orange-700 font-medium text-sm">
                  You want to sell Digital Solutions in Market too? Click here for Assistance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
