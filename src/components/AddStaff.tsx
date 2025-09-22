import React, { useState } from "react";
import axios from "axios";

// Define a type for the staff form
interface StaffForm {
  name: string;
  email: string;
  password: string;
}

const AddStaff: React.FC = () => {
  const [form, setForm] = useState<StaffForm>({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddStaff = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/admin/add-staff", form);
      alert(response.data);
      setForm({ name: "", email: "", password: "" }); // reset form
    } catch (error: any) {
      alert("Failed to add staff: " + error.response?.data || error.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "300px", gap: "10px" }}>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <button onClick={handleAddStaff}>Add Staff</button>
    </div>
  );
};

export default AddStaff;
