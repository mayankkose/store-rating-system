import { useState } from "react";
import API from "../services/api";

function CreateUser() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER"
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
        "/admin/users",
        form
      );

      alert(
        "User Created Successfully"
      );

      setForm({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER"
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to create user"
      );

    }
  };

  return (
    <div className="container mt-4">

      <h2>Create User</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <select
            className="form-select"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="USER">
              USER
            </option>

            <option value="ADMIN">
              ADMIN
            </option>

            <option value="STORE_OWNER">
              STORE OWNER
            </option>
          </select>
        </div>

        <button
          className="btn btn-primary"
          type="submit"
        >
          Create User
        </button>

      </form>

    </div>
  );
}

export default CreateUser;