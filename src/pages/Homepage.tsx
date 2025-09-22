import { Link } from "react-router-dom";
import { Heart, Droplets, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import heroImage from "@/assets/healthcare-hero.jpg";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-medical-light to-accent">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(220, 38, 38, 0.1)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Theme Toggle */}
        <div className="absolute top-6 right-6 z-10">
          <ThemeToggle />
        </div>

        <div className="text-center z-10 max-w-4xl mx-auto px-6">
          {/* Main Heading */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-12 w-12 text-primary mr-4" />
              <Droplets className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-6xl md:text-8xl font-playfair font-bold text-white mb-6 drop-shadow-lg">
              Blood Banking
              <span className="block text-primary-glow">System</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-poppins leading-relaxed">
              Connecting life-saving donors with healthcare providers through 
              secure, professional blood banking management
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link to="/signin">
              <Button 
                size="lg" 
                className="btn-hero text-lg px-12 py-6 font-poppins font-medium min-w-[200px]"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button 
                variant="outline" 
                size="lg" 
                className="glass-card text-white border-white/30 hover:bg-white/20 backdrop-blur-sm text-lg px-12 py-6 font-poppins font-medium min-w-[200px] shadow-lg"
              >
                Join as Donor
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="glass-card border-white/20 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                  Trusted Network
                </h3>
                <p className="text-white/80 font-poppins">
                  Connect with verified healthcare providers and registered donors
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                  Secure Platform
                </h3>
                <p className="text-white/80 font-poppins">
                  HIPAA-compliant security with advanced data protection
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                  Save Lives
                </h3>
                <p className="text-white/80 font-poppins">
                  Every donation can save up to three lives in your community
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;