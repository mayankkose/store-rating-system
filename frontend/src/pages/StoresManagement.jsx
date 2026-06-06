import { useEffect, useState } from "react";
import API from "../services/api";

function StoresManagement() {

  const [search, setSearch] = useState('');
const [stores, setStores] = useState([]);
const [sortOrder, setSortOrder] =
  useState('ASC');
const [sortBy, setSortBy] =
  useState("name");

const [order, setOrder] =
  useState("ASC");
  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
const res = await API.get(
  `/stores?search=${search}&sortBy=${sortBy}&order=${order}`
);
      setStores(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Stores Management</h1>
     <div style={{ marginBottom: "20px" }}>

  <input
    type="text"
    placeholder="Search by Name, Email or Address"
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
  />
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="name">Sort by Name</option>
      <option value="address">Sort by Address</option>
    </select>
    <select
      value={order}
      onChange={(e) => setOrder(e.target.value)}
    >
      <option value="ASC">Sort Ascending</option>
      <option value="DESC">Sort Descending</option>
    </select>
  <button
    onClick={fetchStores}
    style={{ marginLeft: "10px" }}
  >
    Search
  </button>

</div>
      <table
        border="1"
        cellPadding="10"
        width="100%"
      >

        <thead>
          <tr>
            <th>ID</th>
            <th>Store Name</th>
            <th>Address</th>
            <th>Average Rating</th>
          </tr>
        </thead>

        <tbody>

          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.id}</td>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>{store.averageRating}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default StoresManagement;