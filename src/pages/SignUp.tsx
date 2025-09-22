import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import axios from "axios"; // make sure axios is installed
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please ensure both passwords match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Send POST request to backend
      const response = await axios.post("http://localhost:8080/api/donors", {
        fullName: formData.fullName,
        age: Number(formData.age),
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        password: formData.password
      });

      // Success toast
      toast({
        title: "Registration successful!",
        description: "Welcome to the Blood Banking System",
      });

      // Redirect to login page
      navigate("/signin");

    } catch (error: any) {
      console.error(error);
      toast({
        title: "Registration failed",
        description: error.response?.data || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-medical-light to-accent flex items-center justify-center p-4">
      {/* Back Button & Theme Toggle */}
      <div className="absolute top-6 left-6 right-6 flex justify-between z-10">
        <Link to="/">
          <Button variant="outline" className="glass-card border-primary/20">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-2xl glass-card border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-playfair text-primary">
            Join as Donor
          </CardTitle>
          <CardDescription className="text-muted-foreground font-poppins">
            Create your account to start saving lives
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="floating-input">
                <Input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  placeholder=" "
                  className="peer"
                  required
                />
                <Label htmlFor="fullName" className="font-poppins text-muted-foreground">
                  Full Name
                </Label>
              </div>

              <div className="floating-input">
                <Input
                  type="number"
                  id="age"
                  value={formData.age}
                  onChange={(e) => updateFormData("age", e.target.value)}
                  placeholder=" "
                  className="peer"
                  min="18"
                  max="65"
                  required
                />
                <Label htmlFor="age" className="font-poppins text-muted-foreground">
                  Age
                </Label>
              </div>
            </div>

            {/* Gender & Blood Group */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender" className="font-poppins font-medium">
                  Gender
                </Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-primary/20">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodGroup" className="font-poppins font-medium">
                  Blood Group
                </Label>
                <Select value={formData.bloodGroup} onValueChange={(value) => updateFormData("bloodGroup", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-primary/20">
                    {bloodGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="floating-input">
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder=" "
                  className="peer"
                  required
                />
                <Label htmlFor="email" className="font-poppins text-muted-foreground">
                  Email Address
                </Label>
              </div>

              <div className="floating-input">
                <Input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder=" "
                  className="peer"
                  required
                />
                <Label htmlFor="phone" className="font-poppins text-muted-foreground">
                  Phone Number
                </Label>
              </div>
            </div>

            {/* Location */}
            <div className="floating-input">
              <Input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
                placeholder=" "
                className="peer"
                required
              />
              <Label htmlFor="location" className="font-poppins text-muted-foreground">
                Location (City, State)
              </Label>
            </div>

            {/* Password */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative floating-input">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  placeholder=" "
                  className="peer pr-10"
                  required
                />
                <Label htmlFor="password" className="font-poppins text-muted-foreground">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <div className="relative floating-input">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                  placeholder=" "
                  className="peer pr-10"
                  required
                />
                <Label htmlFor="confirmPassword" className="font-poppins text-muted-foreground">
                  Confirm Password
                </Label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full btn-hero text-lg py-6 font-poppins font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Donor Account"}
              <CheckCircle className="ml-2 h-4 w-4" />
            </Button>

            {/* Sign In Link */}
            <div className="text-center text-sm font-poppins">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/signin" className="text-primary hover:text-medical-accent transition-colors font-medium">
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
