import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, UserCheck, Building2, Shield } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const getRoleIcon = (roleValue: string) => {
    switch (roleValue) {
      case "donor": return <UserCheck className="h-4 w-4" />;
      case "hospital": return <Building2 className="h-4 w-4" />;
      case "admin": return <Shield className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      toast({ title: "Select role", description: "Please select your role", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    try {
      let url = "";
      switch (role) {
        case "donor": url = "http://localhost:8080/api/donors/login"; break;
        case "hospital": url = "http://localhost:8080/api/hospitals/login"; break;
        case "admin": url = "http://localhost:8080/api/auth/login"; break;
        default: throw new Error("Invalid role");
      }

      const res = await axios.post(url, { email, password });

      // Save token and profile
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("profileData", JSON.stringify(res.data.user)); 

      if (res.data.user) {
        localStorage.setItem("profileData", JSON.stringify({
          fullName: res.data.user.name,
          email: res.data.user.email,
          phone: res.data.user.phone,
          bloodGroup: res.data.user.bloodGroup,
          location: res.data.user.location,
          role: role.toUpperCase()
        }));
      }

      toast({ title: "Login successful" });

      switch (role) {
        case "donor": navigate("/donor-dashboard"); break;
        case "hospital": navigate("/hospital-dashboard"); break;
        case "admin": navigate("/admin-dashboard"); break;
      }

    } catch (error: any) {
      console.error(error);
      toast({
        title: "Login failed",
        description: error.response?.data?.error || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-medical-light to-accent flex items-center justify-center p-4">
      <div className="absolute top-6 left-6 right-6 flex justify-between z-10">
        <Link to="/">
          <Button variant="outline" className="glass-card border-primary/20">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Button>
        </Link>
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md glass-card border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-playfair text-primary">Welcome Back</CardTitle>
          <CardDescription className="text-muted-foreground font-poppins">
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="role" className="font-poppins font-medium">Select Your Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent className="glass-card border-primary/20">
                  <SelectItem value="donor"><UserCheck className="h-4 w-4 mr-2" /> Donor</SelectItem>
                  <SelectItem value="hospital"><Building2 className="h-4 w-4 mr-2" /> Hospital Staff</SelectItem>
                  <SelectItem value="admin"><Shield className="h-4 w-4 mr-2" /> Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="floating-input">
              <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " className="peer" required />
              <Label htmlFor="email" className="font-poppins text-muted-foreground">Email Address</Label>
            </div>

            <div className="relative floating-input">
              <Input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " className="peer pr-10" required />
              <Label htmlFor="password" className="font-poppins text-muted-foreground">Password</Label>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <Button type="submit" className="w-full btn-hero text-lg py-6 font-poppins font-medium" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"} {role && <span className="ml-2">{getRoleIcon(role)}</span>}
            </Button>

            <div className="text-center text-sm font-poppins">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/signup" className="text-primary hover:text-medical-accent transition-colors font-medium">Join as Donor</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
