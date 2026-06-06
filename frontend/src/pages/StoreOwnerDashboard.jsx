function StoreOwnerDashboard() {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <h1>Store Owner Dashboard</h1>

      <button
        onClick={() =>
          window.location.href =
          "/owner-ratings"
        }
      >
        View Ratings
      </button>

      <button
        onClick={logout}
        style={{ marginLeft: "10px" }}
      >
        Logout
      </button>
    </>
  );
}

export default StoreOwnerDashboard;