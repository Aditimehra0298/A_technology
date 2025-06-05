import { CheckCircle, ArrowLeft, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full shadow-xl border-0">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
            <p className="text-gray-600">
              Your message has been successfully submitted. Our team will get back to you within 24 hours.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                <span>We'll send you a confirmation email</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                <span>Our team will contact you within 24 hours</span>
              </div>
            </div>
          </div>

          <Link href="/">
            <Button className="w-full bg-primary text-white hover:bg-blue-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}