import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
function AdminDashboard() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
  const res = await API.get("/admin/dashboard");
  console.log(res.data);
  setStats(res.data.data);
} catch (error) {
  console.log("Dashboard Error:", error);
}
  };

  return (
  <div style={{ padding: "20px" }}>

      <Navbar />

      <h1>Admin Dashboard</h1>
     <button
  className="btn btn-success me-2"
  onClick={() =>
    window.location.href =
    "/create-user"
  }
>
  Add User
</button>
<button
  onClick={() =>
    window.location.href =
    "/create-store"
  }
>
  Add Store
</button>

    <button
      onClick={() =>
        window.location.href = "/users"
      }
    >
      Manage Users
    </button>
  
    <button
      onClick={() =>
            window.location.href = "/stores"
        }
      style={{ marginLeft: "10px" }}
    >
      Manage Stores
    </button>
     
    <button
  onClick={() => {
    localStorage.clear();
    window.location.href = "/";
  }}
>
  Logout
</button>
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginTop: "20px"
      }}
    >

      {/* Dashboard Cards */}

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          width: "200px"
        }}
      >
        <h3>Total Users</h3>
        <h2>{stats.totalUsers}</h2>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          width: "200px"
        }}
      >
        <h3>Total Stores</h3>
        <h2>{stats.totalStores}</h2>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          width: "200px"
        }}
      >
        <h3>Total Ratings</h3>
        <h2>{stats.totalRatings}</h2>
      </div>

    </div>

  </div>
);
}

export default AdminDashboard;