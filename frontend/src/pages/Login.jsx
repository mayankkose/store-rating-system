import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
     console.log(form);
    try {

      const res =
        await API.post(
          "/auth/login",
          form
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      }
      else if (
        res.data.role ===
        "STORE_OWNER"
      ) {
        navigate("/owner");
      }
      else {
        navigate("/stores");
      }

    } catch (error) {

  console.log(error);

  alert(
    error?.response?.data?.message ||
    error.message ||
    "Login Failed"
  );

}
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br />

        <button type="submit">
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;