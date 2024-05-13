import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLoaderData } from "react-router-dom";

const AvailableFoods = () => {
  const initialData = useLoaderData();
  const [data, setData] = useState([...initialData]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedData, setSortedData] = useState([...data]);
  const [sortBy, setSortBy] = useState(null);
  const [columns, setColumns] = useState(3);
  const [myRequestedFoods, setMyRequestedFoods] = useState([]);

  // Search Functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Sorting the data based on expired_date and time
  const handleSort = (type) => {
    let sorted;
    if (type === "asc") {
      sorted = [...sortedData].sort(
        (a, b) => new Date(a.expired_datetime) - new Date(b.expired_datetime)
      );
    } else if (type === "desc") {
      sorted = [...sortedData].sort(
        (a, b) => new Date(b.expired_datetime) - new Date(a.expired_datetime)
      );
    }
    setSortedData(sorted);
    setSortBy(type);
  };

  // Filter data based on search term
  const filteredData = sortedData.filter(
    (item) =>
      item?.food_name &&
      item?.food_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle the Layout
  const toggleLayout = () => {
    setColumns(columns === 3 ? 2 : 3);
  };

  // Send Request
  const sendRequest = (requestData) => {
    const updatedData = data.map((item) => {
      if (item._id === requestData.foodId) {
        return { ...item, status: "requested" };
      }
      return item;
    });
    setData(updatedData);

    const requestedFood = data.find((item) => item._id === requestData.foodId);
    setMyRequestedFoods([...myRequestedFoods, requestedFood]);

    console.log("Sending request:", requestData);
  };

  return (
    <div className="my-28 mx-10">
      <Helmet>
        <title>Foodle |Available Food</title>
      </Helmet>
      <h2 className="text-4xl text-center text-yellow-500 mt-15 mb-10  font-thin font-lower">
        Available Foods
      </h2>
      <div className="flex justify-center my-5">
        <label className="input input-bordered border-yellow-500 w-80 flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="flex justify-around">
        <div className="flex justify-between mb-4">
          <div>
            <button
              className={`btn btn-outline mx-3 btn-warning ${
                sortBy === "asc" && "btn-active"
              }`}
              onClick={() => handleSort("asc")}
            >
              Sort Asc
            </button>
            <button
              className={`btn btn-outline btn-warning ${
                sortBy === "desc" && "btn-active"
              }`}
              onClick={() => handleSort("desc")}
            >
              Sort Desc
            </button>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              Sorted by:{" "}
              {sortBy
                ? sortBy === "asc"
                  ? "Ascending"
                  : "Descending"
                : "None"}
            </p>
          </div>
        </div>
        <div>
          <button
            className="btn btn-outline btn-warning ml-3"
            onClick={toggleLayout}
          >
            {columns === 3 ? "2 Columns" : "3 Columns"}
          </button>
        </div>
      </div>

      <div className={`grid sm:grid-cols-${columns} grid-cols-3 gap-4`}>
        {filteredData.map((item) => (
          <div
            className="border border-yellow-500 rounded shadow"
            key={item.food_name}
          >
            <img src={item.food_image} alt={item.food_name} />
            <h2 className="text-xl text-center">{item.food_name}</h2>
            <div className="flex gap-4 justify-around items-center">
              <p>Donator: {item?.donator?.name}</p>
              <img
                className="w-12 h-12 rounded-full"
                src={item?.donator?.image}
                alt=""
              />
            </div>

            <p>Food Quantity: {item.food_quantity}</p>
            <p>Pickup Location: {item.pickup_location}</p>
            <p>Expired : {item.expired_datetime}</p>
            <p>Additional Notes: {item.additional_notes}</p>

            <Link
              to={{
                pathname: `/food/${item._id}`,
                state: { sendRequest: sendRequest }, // Pass the sendRequest function
              }}
            >
              <button className="btn btn-outline btn-warning mx-20 mb-0">
                Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
