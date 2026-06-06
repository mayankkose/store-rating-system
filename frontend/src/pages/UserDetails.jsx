import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function UserDetails() {

  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {

    try {

      const res =
        await API.get(
          `/admin/users/${id}`
        );

      setUser(res.data.data);

    } catch (error) {

      console.log(error);

    }
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container mt-4">

      <h1>User Details</h1>

      <div className="card p-3">

        <h4>Name:</h4>
        <p>{user.name}</p>

        <h4>Email:</h4>
        <p>{user.email}</p>

        <h4>Address:</h4>
        <p>{user.address}</p>

        <h4>Role:</h4>
        <p>{user.role}</p>

        {
          user.role === "STORE_OWNER" && (
            <>
              <h4>
                Average Rating:
              </h4>

              <p>
                {
                  user.averageRating ??
                  "No Ratings Yet"
                }
              </p>
            </>
          )
        }

      </div>

    </div>
  );
}

export default UserDetails;