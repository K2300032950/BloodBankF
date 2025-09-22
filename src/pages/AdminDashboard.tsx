import { useState, useEffect } from "react";
import { Shield, Users, Package, TrendingUp, BarChart3, Database, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import { Input } from "@/components/ui/input";
import Modal from "@/components/modal";


// ------------------- Types -------------------
interface BloodInventory {
  name: string;
  value: number;
  color: string;
}

interface DonationTrend {
  month: string;
  donations: number;
}

interface Donor {
  id: number;
  fullName: string;
  age: number;
  gender: string;
  bloodGroup: string;
  email: string;
  phone: string;
  location: string;
  password?: string;
}

interface Activity {
  id: number;
  type: string;
  description: string;
  time: string;
}

// ------------------- Admin Dashboard -------------------
const AdminDashboard = () => {
  // ------------------- Stats & Charts Data -------------------
  const bloodInventoryData: BloodInventory[] = [
    { name: "O+", value: 45, color: "#DC2626" },
    { name: "A+", value: 32, color: "#EF4444" },
    { name: "B+", value: 28, color: "#F87171" },
    { name: "AB+", value: 15, color: "#FCA5A5" },
    { name: "O-", value: 12, color: "#991B1B" },
    { name: "A-", value: 18, color: "#B91C1C" },
    { name: "B-", value: 10, color: "#DC2626" },
    { name: "AB-", value: 8, color: "#7F1D1D" }
  ];

  const donationTrendsData: DonationTrend[] = [
    { month: "Jan", donations: 145 },
    { month: "Feb", donations: 132 },
    { month: "Mar", donations: 168 },
    { month: "Apr", donations: 187 },
    { month: "May", donations: 156 },
    { month: "Jun", donations: 194 }
  ];

  // ------------------- Recent Activity -------------------
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/blood-requests/admin/all");
        const activities: Activity[] = res.data.map((req: any) => ({
          id: req.id,
          type: "Blood Request",
          description: `${req.donorEmail} requested ${req.units} units of ${req.bloodGroup} at ${req.hospital}`,
          time: new Date(req.date).toLocaleString()
        }));
        setRecentActivity(activities.reverse());
      } catch (err) {
        console.error("Failed to fetch activity:", err);
      }
    };
    fetchActivity();
  }, []);

  // ------------------- Donor Management -------------------
  const [donors, setDonors] = useState<Donor[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null);
  const [formData, setFormData] = useState<Partial<Donor>>({});

  const fetchDonors = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/donors");
      setDonors(res.data);
    } catch (err) {
      console.error("Failed to fetch donors:", err);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingDonor) {
        await axios.put(`http://localhost:8080/api/admin/donors/${editingDonor.id}`, formData);
      } else {
        await axios.post("http://localhost:8080/api/admin/donors", formData);
      }
      setShowModal(false);
      setFormData({});
      setEditingDonor(null);
      fetchDonors();
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  const handleEdit = (donor: Donor) => {
    setEditingDonor(donor);
    setFormData(donor);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      await axios.delete(`http://localhost:8080/api/admin/donors/${id}`);
      fetchDonors();
    }
  };

  // ------------------- Render -------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-medical-light to-accent">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-playfair font-bold text-primary">Blood Banking System</h1>
              <p className="text-sm text-muted-foreground font-poppins">Administrator Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/profile?role=Admin">
              <Button variant="outline" className="glass-card border-primary/20">
                <User className="h-4 w-4 mr-2" /> Profile
              </Button>
            </Link>
            <Link to="/settings?role=Admin">
              <Button variant="outline" className="glass-card border-primary/20">
                <Settings className="h-4 w-4 mr-2" /> Settings
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-2">System Overview</h2>
          <p className="text-lg text-muted-foreground font-poppins">Complete administrative control and analytics for the Blood Banking System</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="stats-card">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-poppins text-muted-foreground mb-1">Total Users</p>
                <p className="text-3xl font-playfair font-bold text-primary">2,847</p>
                <p className="text-xs text-success font-poppins">+128 this month</p>
              </div>
              <Users className="h-12 w-12 text-primary/20" />
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-poppins text-muted-foreground mb-1">Blood Units</p>
                <p className="text-3xl font-playfair font-bold text-primary">1,268</p>
                <p className="text-xs text-warning font-poppins">15 units low stock</p>
              </div>
              <Package className="h-12 w-12 text-primary/20" />
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-poppins text-muted-foreground mb-1">Monthly Donations</p>
                <p className="text-3xl font-playfair font-bold text-primary">194</p>
                <p className="text-xs text-success font-poppins">+12% from last month</p>
              </div>
              <TrendingUp className="h-12 w-12 text-success/20" />
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-poppins text-muted-foreground mb-1">Pending Requests</p>
                <p className="text-3xl font-playfair font-bold text-warning">23</p>
                <p className="text-xs text-warning font-poppins">5 critical</p>
              </div>
              <BarChart3 className="h-12 w-12 text-warning/20" />
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Blood Inventory Pie */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-playfair">
                <Package className="h-5 w-5 text-primary" /> Blood Inventory Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={bloodInventoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {bloodInventoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Donation Trends Bar */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-playfair">
                <TrendingUp className="h-5 w-5 text-primary" /> Monthly Donation Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={donationTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="donations" fill="#DC2626" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Donor Management */}
        <div className="mt-8">
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-playfair">
                <Database className="h-5 w-5 text-primary" /> Donor Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowModal(true)}>Add Donor</Button>
              <table className="table-auto w-full mt-4 border border-gray-200">
                <thead>
                  <tr>
                    <th>Name</th><th>Age</th><th>Gender</th><th>Blood Group</th><th>Email</th><th>Phone</th><th>Location</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map((donor) => (
                    <tr key={donor.id}>
                      <td>{donor.fullName}</td>
                      <td>{donor.age}</td>
                      <td>{donor.gender}</td>
                      <td>{donor.bloodGroup}</td>
                      <td>{donor.email}</td>
                      <td>{donor.phone}</td>
                      <td>{donor.location}</td>
                      <td className="flex gap-2">
                        <Button size="sm" onClick={() => handleEdit(donor)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(donor.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-1 gap-8 mt-8">
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-playfair">
                <TrendingUp className="h-5 w-5 text-primary" /> Recent System Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-4 rounded-lg bg-accent/50 border border-primary/10">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">{activity.type}</Badge>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                    <p className="text-sm text-foreground mt-1">{activity.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Modal for Add/Edit Donor */}
      {showModal && (
      <Modal
  open={showModal}  // required!
  onClose={() => {
    setShowModal(false);
    setEditingDonor(null);
    setFormData({});
  }}
>

          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">{editingDonor ? "Edit Donor" : "Add Donor"}</h2>
            <div className="grid gap-2">
              <Input name="fullName" placeholder="Full Name" value={formData.fullName || ""} onChange={handleChange} />
              <Input name="age" type="number" placeholder="Age" value={formData.age || ""} onChange={handleChange} />
              <Input name="gender" placeholder="Gender" value={formData.gender || ""} onChange={handleChange} />
              <Input name="bloodGroup" placeholder="Blood Group" value={formData.bloodGroup || ""} onChange={handleChange} />
              <Input name="email" placeholder="Email" value={formData.email || ""} onChange={handleChange} />
              <Input name="phone" placeholder="Phone" value={formData.phone || ""} onChange={handleChange} />
              <Input name="location" placeholder="Location" value={formData.location || ""} onChange={handleChange} />
              <Input name="password" type="password" placeholder="Password" value={formData.password || ""} onChange={handleChange} />
              <Button onClick={handleSubmit} className="mt-2">{editingDonor ? "Update" : "Add"}</Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default AdminDashboard;
