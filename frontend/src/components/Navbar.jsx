import { Link } from "react-router-dom";

function Navbar() {

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";

  };

  return (

    <nav className="navbar navbar-dark bg-dark px-3">

      <Link
        className="navbar-brand"
        to="/"
      >
        Store Rating
      </Link>

      <div>

        <Link
          className="btn btn-light me-2"
          to="/admin"
        >
          Dashboard
        </Link>

        <Link
          className="btn btn-light me-2"
          to="/users"
        >
          Users
        </Link>

        <Link
          className="btn btn-light me-2"
          to="/manage-stores"
        >
          Stores
        </Link>
       <Link
  className="btn btn-warning me-2"
  to="/change-password"
>
  Change Password
</Link>
        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;