import { useState, useEffect } from "react";
import axios from "axios";
import { Heart, Calendar, MapPin, Bell, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  bloodGroup: string;
  location: string;
  role: string;
}

interface BloodRequest {
  id?: number;
  bloodGroup: string;
  units: number | string;
  hospital: string;
  date: string;
  notes?: string;
  donorEmail?: string;
}

interface Donation {
  id: number;
  date: string;
  location: string;
  status: string;
}

interface Notification {
  id: number;
  message: string;
  type: string;
}

const DonorDashboard = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "",
    email: "",
    phone: "",
    bloodGroup: "",
    location: "",
    role: "",
  });

  const [bloodRequest, setBloodRequest] = useState<BloodRequest>({
    bloodGroup: "",
    units: "",
    hospital: "",
    date: "",
    notes: "",
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "You're eligible to donate again in 2 days!", type: "info" },
    { id: 2, message: "Blood drive near you this Saturday", type: "success" },
    { id: 3, message: "Thank you for your last donation - it helped save lives!", type: "success" }
  ]);

  const [donationHistory, setDonationHistory] = useState<Donation[]>([
    { id: 1, date: "2024-01-15", location: "City General Hospital", status: "Completed" },
    { id: 2, date: "2023-11-10", location: "Red Cross Center", status: "Completed" },
    { id: 3, date: "2023-09-05", location: "Community Health Center", status: "Completed" }
  ]);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        setProfileData(parsedProfile);
      } catch (error) {
        console.error("Failed to parse profile data from localStorage", error);
      }
    }
  }, []);

  const handleBloodRequestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBloodRequest({ ...bloodRequest, [e.target.name]: e.target.value });
  };

  const handleBloodRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/blood-requests", {
        ...bloodRequest,
        donorEmail: profileData.email, // attach donor email
      });
      alert(`Blood request submitted for ${bloodRequest.units} units of ${bloodRequest.bloodGroup}`);
      setBloodRequest({ bloodGroup: "", units: "", hospital: "", date: "", notes: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to submit blood request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-medical-light to-accent">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Heart className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Blood Banking System</h1>
              <p className="text-sm text-muted-foreground">Donor Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/profile?role=Donor">
              <Button variant="outline" className="glass-card border-primary/20">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Link to="/settings?role=Donor">
              <Button variant="outline" className="glass-card border-primary/20">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <h2 className="text-4xl font-bold text-primary mb-2">
          Welcome back, {profileData.fullName || "Donor"}!
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Thank you for being a life-saving donor. Here's your impact summary.
        </p>

        {/* Blood Request Form */}
        <div className="mt-8 mb-8">
          <Card className="glass-card border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Request Blood</h3>
              <form onSubmit={handleBloodRequestSubmit} className="grid md:grid-cols-2 gap-4">
                <Input
                  name="bloodGroup"
                  value={bloodRequest.bloodGroup}
                  onChange={handleBloodRequestChange}
                  placeholder="Blood Group (e.g., O+)"
                  required
                />
                <Input
                  name="units"
                  type="number"
                  value={bloodRequest.units}
                  onChange={handleBloodRequestChange}
                  placeholder="Units"
                  required
                />
                <Input
                  name="hospital"
                  value={bloodRequest.hospital}
                  onChange={handleBloodRequestChange}
                  placeholder="Hospital/Location"
                  required
                />
                <Input
                  name="date"
                  type="date"
                  value={bloodRequest.date}
                  onChange={handleBloodRequestChange}
                  required
                />
                <Textarea
                  name="notes"
                  value={bloodRequest.notes}
                  onChange={handleBloodRequestChange}
                  placeholder="Additional Notes"
                  className="md:col-span-2"
                />
                <div className="md:col-span-2 flex justify-end">
                  <Button type="submit" className="btn-hero">Submit Request</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-primary mb-4">Notifications</h3>
          {notifications.map((note) => (
            <Card key={note.id} className="mb-2 glass-card border-primary/10">
              <CardContent className="flex justify-between items-center">
                <p className="font-poppins text-sm">{note.message}</p>
                <Badge variant="outline" className="text-xs">
                  {note.type}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Donation History Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-primary mb-4">Donation History</h3>
          {donationHistory.map((donation) => (
            <Card key={donation.id} className="mb-2 glass-card border-primary/10">
              <CardContent className="grid md:grid-cols-4 gap-2">
                <p className="font-poppins text-sm">{donation.date}</p>
                <p className="font-poppins text-sm">{donation.location}</p>
                <Badge variant={donation.status === "Completed" ? "default" : "destructive"} className="text-xs">
                  {donation.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
