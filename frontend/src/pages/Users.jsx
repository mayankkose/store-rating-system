import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
function Users() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [sortBy, setSortBy] =
  useState("name");

const [order, setOrder] =
  useState("ASC");
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {

     const res = await API.get(
  `/admin/users?search=${search}&role=${role}`
);

      setUsers(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Users Management</h1>

      <input
        type="text"
        placeholder="Search User"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />
      <select
        value={role}
        onChange={(e) =>  setRole(e.target.value)}
      >
        <option value="">All Roles</option>  
           <option value="ADMIN">Admin</option> 
              <option value="STORE_OWNER">Store Owner</option>    
               <option value="CUSTOMER">Customer</option>  
                </select>             
      <button onClick={fetchUsers}>
        Search
      </button>

      <table
        border="1"
        cellPadding="10"
        style={{
          marginTop: "20px",
          width: "100%"
        }}
      >

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (
           <tr key={user.id}>
  <td>{user.id}</td>
  <td>{user.name}</td>
  <td>{user.email}</td>
  <td>{user.role}</td>
  <td>{user.address}</td>

  <td>
    <Link
      to={`/users/${user.id}`}
      className="btn btn-primary"
    >
      View Details
    </Link>
  </td>
</tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Users;