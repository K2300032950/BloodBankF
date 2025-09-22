import { useState } from "react";
import { Building2, FileText, Clock, CheckCircle, AlertCircle, User, Settings, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Link } from "react-router-dom";

const HospitalDashboard = () => {
  const [requests] = useState([
    { 
      id: 1, 
      bloodGroup: "O-", 
      units: 4, 
      urgency: "Critical", 
      status: "Pending", 
      requestDate: "2024-01-20",
      hospital: "City General Hospital"
    },
    { 
      id: 2, 
      bloodGroup: "A+", 
      units: 2, 
      urgency: "High", 
      status: "Approved", 
      requestDate: "2024-01-19",
      hospital: "City General Hospital"
    },
    { 
      id: 3, 
      bloodGroup: "B+", 
      units: 6, 
      urgency: "Medium", 
      status: "In Progress", 
      requestDate: "2024-01-18",
      hospital: "City General Hospital"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-warning/10 text-warning border-warning/20";
      case "Approved": return "bg-success/10 text-success border-success/20";
      case "In Progress": return "bg-primary/10 text-primary border-primary/20";
      case "Completed": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical": return "bg-destructive/10 text-destructive border-destructive/20";
      case "High": return "bg-warning/10 text-warning border-warning/20";
      case "Medium": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-medical-light to-accent">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-playfair font-bold text-primary">Blood Banking System</h1>
              <p className="text-sm text-muted-foreground font-poppins">Hospital Staff Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/profile?role=Hospital Staff">
              <Button variant="outline" className="glass-card border-primary/20">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Link to="/settings?role=Hospital Staff">
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-2">
            Hospital Dashboard
          </h2>
          <p className="text-lg text-muted-foreground font-poppins">
            Manage blood requests and monitor inventory for City General Hospital
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="stats-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-poppins text-muted-foreground mb-1">Active Requests</p>
                  <p className="text-3xl font-playfair font-bold text-primary">8</p>
                  <p className="text-xs text-warning font-poppins">3 critical</p>
                </div>
                <FileText className="h-12 w-12 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-poppins text-muted-foreground mb-1">Pending Approval</p>
                  <p className="text-3xl font-playfair font-bold text-warning">3</p>
                  <p className="text-xs text-muted-foreground font-poppins">Awaiting admin</p>
                </div>
                <Clock className="h-12 w-12 text-warning/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-poppins text-muted-foreground mb-1">Approved Today</p>
                  <p className="text-3xl font-playfair font-bold text-success">5</p>
                  <p className="text-xs text-success font-poppins">Ready for pickup</p>
                </div>
                <CheckCircle className="h-12 w-12 text-success/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-poppins text-muted-foreground mb-1">Critical Alerts</p>
                  <p className="text-3xl font-playfair font-bold text-destructive">2</p>
                  <p className="text-xs text-destructive font-poppins">Urgent attention</p>
                </div>
                <AlertCircle className="h-12 w-12 text-destructive/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card className="glass-card border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-playfair font-semibold text-primary mb-4">
                Quick Actions
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Button className="btn-hero h-16 flex-col space-y-2">
                  <Plus className="h-6 w-6" />
                  <span className="font-poppins">New Blood Request</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col space-y-2 glass-card border-primary/20">
                  <FileText className="h-6 w-6" />
                  <span className="font-poppins">View All Requests</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col space-y-2 glass-card border-primary/20">
                  <AlertCircle className="h-6 w-6" />
                  <span className="font-poppins">Emergency Protocol</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Requests */}
        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-playfair">
              <FileText className="h-5 w-5 text-primary" />
              Recent Blood Requests
            </CardTitle>
            <CardDescription className="font-poppins">
              Track and manage your hospital's blood inventory requests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {requests.map((request) => (
              <div 
                key={request.id}
                className="flex items-center justify-between p-6 rounded-lg bg-accent/50 border border-primary/10 hover:bg-accent/70 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-playfair font-bold text-primary">
                      {request.bloodGroup}
                    </p>
                    <p className="text-sm text-muted-foreground font-poppins">
                      {request.units} units
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-poppins font-medium text-foreground mb-1">
                      Request #{request.id}
                    </p>
                    <p className="text-sm text-muted-foreground font-poppins">
                      Requested on {new Date(request.requestDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground font-poppins">
                      {request.hospital}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant="outline" className={getUrgencyColor(request.urgency)}>
                    {request.urgency}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="glass-card border-primary/20">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HospitalDashboard;