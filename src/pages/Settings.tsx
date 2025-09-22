import { useState, useEffect } from "react";
import { ArrowLeft, Shield, Bell, Moon, Sun, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Settings = () => {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState("Donor");
  
  // Detect role from URL params or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get('role') || localStorage.getItem('currentRole') || 'Donor';
    setCurrentRole(roleParam);
  }, []);

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

  const [notifications, setNotifications] = useState({
    emailDonationReminders: true,
    smsAlerts: false,
    bloodDriveNotifications: true,
    emergencyRequests: true,
    weeklyReports: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    shareStats: true,
    showLocation: false
  });

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const { toast } = useToast();

  const handleNotificationChange = (key: string, checked: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: checked }));
    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved."
    });
  };

  const handlePrivacyChange = (key: string, checked: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: checked }));
    toast({
      title: "Settings updated",
      description: "Your privacy settings have been saved."
    });
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Password mismatch",
        description: "New passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    // Simulate password change
    setIsChangePasswordOpen(false);
    setPasswords({ current: "", new: "", confirm: "" });
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully."
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been successfully logged out."
    });
    // Redirect to home page
    window.location.href = "/";
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
        {/* Settings Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-primary mb-2">
            Settings
          </h1>
          <p className="text-lg text-muted-foreground font-poppins">
            Manage your account preferences and security settings
          </p>
        </div>

        <div className="space-y-8">
          {/* Security Settings */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-playfair">
                <Shield className="h-5 w-5 text-primary" />
                Security Settings
              </CardTitle>
              <CardDescription className="font-poppins">
                Manage your account security and authentication preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-poppins font-medium">Change Password</Label>
                  <p className="text-sm text-muted-foreground font-poppins">
                    Update your account password for better security
                  </p>
                </div>
                <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="glass-card border-primary/20">
                      Change Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card border-primary/20">
                    <DialogHeader>
                      <DialogTitle className="font-playfair">Change Password</DialogTitle>
                      <DialogDescription className="font-poppins">
                        Enter your current password and choose a new one
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="current-password" className="font-poppins">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={passwords.current}
                          onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                          className="glass-card border-primary/20"
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-password" className="font-poppins">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={passwords.new}
                          onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                          className="glass-card border-primary/20"
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password" className="font-poppins">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={passwords.confirm}
                          onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                          className="glass-card border-primary/20"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handlePasswordChange} className="btn-hero">
                        Update Password
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-poppins font-medium">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground font-poppins">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline" className="glass-card border-primary/20">
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-playfair">
                <Bell className="h-5 w-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription className="font-poppins">
                Choose how you want to receive notifications and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-poppins font-medium">Email Donation Reminders</Label>
                  <p className="text-sm text-muted-foreground font-poppins">
                    Get reminded when you're eligible to donate again
                  </p>
                </div>
                <Switch
                  checked={notifications.emailDonationReminders}
                  onCheckedChange={(checked) => handleNotificationChange("emailDonationReminders", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-poppins font-medium">SMS Alerts</Label>
                  <p className="text-sm text-muted-foreground font-poppins">
                    Receive urgent notifications via text message
                  </p>
                </div>
                <Switch
                  checked={notifications.smsAlerts}
                  onCheckedChange={(checked) => handleNotificationChange("smsAlerts", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-poppins font-medium">Blood Drive Notifications</Label>
                  <p className="text-sm text-muted-foreground font-poppins">
                    Get notified about nearby blood drives and events
                  </p>
                </div>
                <Switch
                  checked={notifications.bloodDriveNotifications}
                  onCheckedChange={(checked) => handleNotificationChange("bloodDriveNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-poppins font-medium">Emergency Requests</Label>
                  <p className="text-sm text-muted-foreground font-poppins">
                    Get notified about critical blood shortage situations
                  </p>
                </div>
                <Switch
                  checked={notifications.emergencyRequests}
                  onCheckedChange={(checked) => handleNotificationChange("emergencyRequests", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-poppins font-medium">Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground font-poppins">
                    Receive weekly summaries of your donation impact
                  </p>
                </div>
                <Switch
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => handleNotificationChange("weeklyReports", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-playfair">
                <Shield className="h-5 w-5 text-primary" />
                Privacy Settings
              </CardTitle>
              <CardDescription className="font-poppins">
                Control the visibility of your profile and donation information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-poppins font-medium">Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground font-poppins">
                    Allow other users to see your basic profile information
                  </p>
                </div>
                <Switch
                  checked={privacy.profileVisibility}
                  onCheckedChange={(checked) => handlePrivacyChange("profileVisibility", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-poppins font-medium">Share Donation Statistics</Label>
                  <p className="text-sm text-muted-foreground font-poppins">
                    Allow your donation count to be included in public statistics
                  </p>
                </div>
                <Switch
                  checked={privacy.shareStats}
                  onCheckedChange={(checked) => handlePrivacyChange("shareStats", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-poppins font-medium">Show Location</Label>
                  <p className="text-sm text-muted-foreground font-poppins">
                    Display your city to help match nearby donation requests
                  </p>
                </div>
                <Switch
                  checked={privacy.showLocation}
                  onCheckedChange={(checked) => handlePrivacyChange("showLocation", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-playfair">
                <Sun className="h-5 w-5 text-primary" />
                Appearance
              </CardTitle>
              <CardDescription className="font-poppins">
                Customize the appearance of your interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-poppins font-medium">Theme</Label>
                  <p className="text-sm text-muted-foreground font-poppins">
                    Choose between light and dark mode, or use system preference
                  </p>
                </div>
                <ThemeToggle />
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="glass-card border-primary/20 border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-playfair text-destructive">
                <LogOut className="h-5 w-5" />
                Account Actions
              </CardTitle>
              <CardDescription className="font-poppins">
                Manage your account status and session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-poppins font-medium">Sign Out</Label>
                  <p className="text-sm text-muted-foreground font-poppins">
                    Sign out of your account on this device
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="glass-card border-destructive/20 text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;