import { useState } from "react";
import API from "../services/api";

function CreateStore() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: ""
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

      const res = await API.post(
        "/stores",
        form
      );

      alert("Store Created Successfully");

      console.log(res.data);

      setForm({
        name: "",
        email: "",
        address: "",
        owner_id: ""
      });

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        "Failed to create store"
      );

    }

  };

  return (
    <div className="container mt-4">

      <h2>Create Store</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">

          <label>
            Store Name
          </label>

          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />

        </div>

        <div className="mb-3">

          <label>
            Store Email
          </label>

          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />

        </div>

        <div className="mb-3">

          <label>
            Address
          </label>

          <input
            type="text"
            name="address"
            className="form-control"
            value={form.address}
            onChange={handleChange}
            required
          />

        </div>

        <div className="mb-3">

          <label>
            Owner ID
          </label>

          <input
            type="number"
            name="owner_id"
            className="form-control"
            value={form.owner_id}
            onChange={handleChange}
            required
          />

        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Create Store
        </button>

      </form>

    </div>
  );
}

export default CreateStore;