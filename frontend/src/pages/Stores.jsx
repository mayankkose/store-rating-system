import { useEffect, useState } from "react";
import API from "../services/api";

function Stores() {
  
  const [stores, setStores] = useState([]);
 const [search, setSearch] = useState("");
  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {

      const res =
  await API.get(
    `/stores?search=${search}`
  );

      setStores(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  const submitRating = async (
    storeId,
    rating
  ) => {

    try {

      await API.post(
        "/ratings",
        {
          storeId,
          rating
        }
      );

      alert(
        "Rating Submitted Successfully"
      );

      fetchStores();

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>
        Store Listings
      </h1>
      <button
  onClick={() => {
    localStorage.clear();
    window.location.href = "/";
  }}
>
  Logout
</button>
<div style={{ margin: "20px 0" }}>

  <input
    type="text"
    placeholder="Search by Store Name or Address"
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    style={{
      padding: "8px",
      width: "250px"
    }}
  />

  <button
    onClick={fetchStores}
    style={{
      marginLeft: "10px",
      padding: "8px"
    }}
  >
    Search
  </button>

</div>
      {
        stores.map((store) => (

          <div
            key={store.id}
            style={{
              border:
                "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px"
            }}
          >

            <h3>
              {store.name}
            </h3>

            <p>
              {store.address}
            </p>

            <p>
              Average Rating:
              {" "}
              {store.averageRating}
            </p>

            <p>
              My Rating:
              {" "}
              {store.myRating || "Not Rated"}
            </p>

            <select
              onChange={(e) =>
                submitRating(
                  store.id,
                  Number(e.target.value)
                )
              }
            >

              <option value="">
                Select Rating
              </option>

              <option value="1">
                1
              </option>

              <option value="2">
                2
              </option>

              <option value="3">
                3
              </option>

              <option value="4">
                4
              </option>

              <option value="5">
                5
              </option>

            </select>

          </div>

        ))
      }

    </div>
  );
}

export default Stores;