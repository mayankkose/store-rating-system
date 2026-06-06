import { useEffect, useState } from "react";
import API from "../services/api";

function StoreOwnerRatings() {

  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {

      const res = await API.get(
        "/store-owner/ratings"
      );

      setRatings(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Store Owner Ratings</h1>

      <table
        border="1"
        cellPadding="10"
        width="100%"
      >
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Rating</th>
          </tr>
        </thead>

        <tbody>

          {ratings.map((item) => (
            <tr key={item.id}>
              <td>{item.User?.name}</td>
              <td>{item.User?.email}</td>
              <td>{item.rating}</td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}

export default StoreOwnerRatings;