import { useState, useEffect } from "react";
import { ArrowLeft, Camera, Save, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [currentRole, setCurrentRole] = useState("Donor");
  
  // Role-based profile data
  const roleProfiles = {
    Donor: {
      fullName: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      bloodGroup: "O+",
      location: "New York, NY",
      role: "Donor"
    },
    "Hospital Staff": {
      fullName: "Dr. Sarah Wilson",
      email: "s.wilson@cityhospital.com",
      phone: "+1 (555) 987-6543",
      bloodGroup: "A-",
      location: "City General Hospital, NY",
      role: "Hospital Staff"
    },
    Admin: {
      fullName: "Michael Chen",
      email: "m.chen@bloodbank.admin",
      phone: "+1 (555) 456-7890",
      bloodGroup: "B+",
      location: "Blood Bank HQ, NY",
      role: "Administrator"
    }
  };

  const [profileData, setProfileData] = useState(roleProfiles.Donor);

  const { toast } = useToast();

  // Detect role from URL params or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get('role') || localStorage.getItem('currentRole') || 'Donor';
    setCurrentRole(roleParam);
    setProfileData(roleProfiles[roleParam as keyof typeof roleProfiles] || roleProfiles.Donor);
  }, []);

  // Role-based activity history
  const getActivityHistory = () => {
    switch (currentRole) {
      case "Hospital Staff":
        return [
          { date: "2024-01-20", location: "Emergency Request O- (4 units)", status: "Approved" },
          { date: "2024-01-19", location: "Routine Request A+ (2 units)", status: "Completed" },
          { date: "2024-01-18", location: "Surgery Request B+ (6 units)", status: "In Progress" }
        ];
      case "Admin":
        return [
          { date: "2024-01-20", location: "System Update - User Management", status: "Completed" },
          { date: "2024-01-19", location: "Inventory Audit - All Blood Types", status: "Completed" },
          { date: "2024-01-18", location: "Emergency Protocol Activation", status: "Resolved" }
        ];
      default: // Donor
        return [
          { date: "2024-01-15", location: "City General Hospital", status: "Completed" },
          { date: "2023-11-10", location: "Red Cross Center", status: "Completed" },
          { date: "2023-09-05", location: "Community Health Center", status: "Completed" }
        ];
    }
  };

  const activityHistory = getActivityHistory();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully."
    });
  };

  const getDashboardRoute = () => {
    switch (currentRole) {
      case "Hospital Staff":
        return "/hospital-dashboard";
      case "Admin":
        return "/admin-dashboard";
      default:
        return "/donor-dashboard";
    }
  };

  const getActivityTitle = () => {
    switch (currentRole) {
      case "Hospital Staff":
        return "Request History";
      case "Admin":
        return "System Activity";
      default:
        return "Donation History";
    }
  };

  const updateProfileData = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-medical-light to-accent">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Button 
            onClick={() => navigate(getDashboardRoute())}
            variant="outline" 
            className="glass-card border-primary/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Profile Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-primary mb-2">
            Profile Settings
          </h1>
          <p className="text-lg text-muted-foreground font-poppins">
            Manage your personal information and account settings
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-playfair">Personal Information</CardTitle>
                    <CardDescription className="font-poppins">
                      Update your account details and personal information
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button 
                      onClick={() => setIsEditing(true)}
                      variant="outline" 
                      className="glass-card border-primary/20"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSave}
                        className="btn-hero"
                        size="sm"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button 
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        size="sm"
                        className="glass-card border-primary/20"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {profileData.fullName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" className="glass-card border-primary/20">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                  )}
                </div>

                {/* Form Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-poppins font-medium">Full Name</Label>
                    {isEditing ? (
                      <Input
                        value={profileData.fullName}
                        onChange={(e) => updateProfileData("fullName", e.target.value)}
                        className="glass-card border-primary/20"
                      />
                    ) : (
                      <p className="text-foreground font-poppins p-3 bg-accent/50 rounded-md">
                        {profileData.fullName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="font-poppins font-medium">Email Address</Label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => updateProfileData("email", e.target.value)}
                        className="glass-card border-primary/20"
                      />
                    ) : (
                      <p className="text-foreground font-poppins p-3 bg-accent/50 rounded-md">
                        {profileData.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="font-poppins font-medium">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => updateProfileData("phone", e.target.value)}
                        className="glass-card border-primary/20"
                      />
                    ) : (
                      <p className="text-foreground font-poppins p-3 bg-accent/50 rounded-md">
                        {profileData.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="font-poppins font-medium">Blood Group</Label>
                    <p className="text-foreground font-poppins p-3 bg-accent/50 rounded-md">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {profileData.bloodGroup}
                      </Badge>
                    </p>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label className="font-poppins font-medium">Location</Label>
                    {isEditing ? (
                      <Input
                        value={profileData.location}
                        onChange={(e) => updateProfileData("location", e.target.value)}
                        className="glass-card border-primary/20"
                      />
                    ) : (
                      <p className="text-foreground font-poppins p-3 bg-accent/50 rounded-md">
                        {profileData.location}
                      </p>
                    )}
                  </div>
                </div>

                {/* Account Information */}
                <div className="pt-6 border-t border-primary/20">
                  <h3 className="text-lg font-playfair font-semibold text-primary mb-4">
                    Account Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-poppins font-medium text-muted-foreground">Role</Label>
                      <p className="text-foreground font-poppins mt-1">
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          {profileData.role}
                        </Badge>
                      </p>
                    </div>
                    <div>
                      <Label className="font-poppins font-medium text-muted-foreground">Member Since</Label>
                      <p className="text-foreground font-poppins mt-1">January 2023</p>
                    </div>
                    <div>
                      <Label className="font-poppins font-medium text-muted-foreground">Last Login</Label>
                      <p className="text-foreground font-poppins mt-1">Today at 2:30 PM</p>
                    </div>
                    <div>
                      <Label className="font-poppins font-medium text-muted-foreground">Account Status</Label>
                      <p className="text-foreground font-poppins mt-1">
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          Active
                        </Badge>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Donation History Sidebar */}
          <div>
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="font-playfair">{getActivityTitle()}</CardTitle>
                <CardDescription className="font-poppins">
                  Your recent {currentRole === 'Admin' ? 'system' : currentRole === 'Hospital Staff' ? 'request' : 'donation'} activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activityHistory.map((activity, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg bg-accent/50 border border-primary/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        {activity.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-poppins">
                        {new Date(activity.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm font-poppins text-foreground">
                      {activity.location}
                    </p>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full glass-card border-primary/20">
                  View All {currentRole === 'Admin' ? 'Activities' : currentRole === 'Hospital Staff' ? 'Requests' : 'Donations'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;