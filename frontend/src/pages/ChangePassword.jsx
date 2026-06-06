import { useState } from "react";
import API from "../services/api";

function ChangePassword() {

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: ""
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

      const res = await API.put(
        "/auth/change-password",
        form
      );

      alert(res.data.message);

      setForm({
        oldPassword: "",
        newPassword: ""
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Password update failed"
      );

    }
  };

  return (
    <div className="container mt-4">

      <h2>Change Password</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">

          <label>
            Old Password
          </label>

          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            className="form-control"
          />

        </div>

        <div className="mb-3">

          <label>
            New Password
          </label>

          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="form-control"
          />

        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Update Password
        </button>

      </form>

    </div>
  );
}

export default ChangePassword;