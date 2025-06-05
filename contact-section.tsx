import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { MapPin, Phone, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().regex(/^[\+]?[0-9\s\-\(\)]{10,15}$/, "Please enter a valid mobile number"),
  query: z.string().min(10, "Please provide more details (minimum 10 characters)"),
  consent: z.boolean().refine(val => val === true, "You must accept the terms and conditions")
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      query: "",
      consent: false
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: Omit<ContactFormData, 'consent'>) => {
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

  const onSubmit = (data: ContactFormData) => {
    const { consent, ...submitData } = data;
    contactMutation.mutate(submitData);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      content: ["123 Innovation Hub", "Tech City, State 12345", "United States"],
      color: "bg-primary"
    },
    {
      icon: Phone,
      title: "Phone Number",
      content: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      color: "bg-secondary"
    },
    {
      icon: Mail,
      title: "Email Address",
      content: ["hello@agency.com", "contact@agency.com"],
      color: "bg-accent"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Let's Build Something Amazing Together</h2>
          <p className="text-lg text-neutral-900 max-w-2xl mx-auto">
            Transform your vision into reality with our expert technology solutions. Connect with our team to explore endless possibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2">{info.title}</h3>
                      <div className="text-neutral-900">
                        {info.content.map((line, lineIndex) => (
                          <div key={lineIndex}>{line}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
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
                              <FormLabel>Mobile Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="+91 98765 43210" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
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
                            <FormLabel>Your Query *</FormLabel>
                            <FormControl>
                              <Textarea
                                rows={6}
                                placeholder="Please describe your requirements or query in detail..."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="consent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm text-neutral-900">
                                I agree to the{" "}
                                <a href="#" className="text-primary hover:text-blue-800">
                                  Terms & Conditions
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-primary hover:text-blue-800">
                                  Privacy Policy
                                </a>
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-primary text-white hover:bg-blue-800 font-semibold py-3"
                        disabled={contactMutation.isPending}
                      >
                        {contactMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
