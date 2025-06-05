import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const NavLinks = () => (
    <>
      <button 
        onClick={() => scrollToSection("home")}
        className="text-neutral-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Home
      </button>
      <button 
        onClick={() => scrollToSection("services")}
        className="text-neutral-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Services
      </button>
      <button 
        onClick={() => scrollToSection("about")}
        className="text-neutral-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
      >
        About
      </button>
      <button 
        onClick={() => scrollToSection("contact")}
        className="text-neutral-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Contact
      </button>
    </>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">A</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-6">
              <NavLinks />
            </div>
            <Button 
              onClick={() => scrollToSection("contact")}
              className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-blue-800 transition-colors"
            >
              Get in Touch
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-8">
                  <NavLinks />
                  <Button 
                    onClick={() => scrollToSection("contact")}
                    className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-blue-800 transition-colors w-full"
                  >
                    Get in Touch
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
