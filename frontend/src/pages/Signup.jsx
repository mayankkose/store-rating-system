import { useState } from "react";
import API from "../services/api";

function Signup() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/signup",
        form
      );

      alert(
        "Registered Successfully"
      );

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <br />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br />

        <input
          name="address"
          placeholder="Address"
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
          Signup
        </button>

      </form>
    </div>
  );
}

export default Signup;