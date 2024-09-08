import { useState } from "react";

import { useEffect } from "react";
import { Link } from "react-router-dom";
const FeaturedFoods = () => {
  const [food, setFood] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/food")
      .then((res) => res.json())
      .then((data) => setFood(data));
  }, []);

  // Function to sort data by food_quantity and return the highest 20 items
  const getHighestQuantityFoods = () => {
    const sortedData = [...food].sort(
      (a, b) => b.food_quantity - a.food_quantity
    );
    return sortedData.slice(0, 6);
  };

  // Call the function to get the highest quantity foods
  const highestQuantityFoods = getHighestQuantityFoods();

  return (
    <div className="my-28 mx-10">
      <h2 className="text-5xl text-center text-yellow-500 my-20  font-thin font-lower">
        Featured Foods
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10">
        {highestQuantityFoods.map((item) => (
          <div
            className="border border-yellow-500 rounded-xl shadow"
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

            <div className="ml-3 text-lg">
              <p>Food Quantity: {item.food_quantity}</p>
              <p>Pickup Location: {item.pickup_location}</p>
              <p>Expired : {item.expired_datetime}</p>
              <p>Additional Notes: {item.additional_notes}</p>
            </div>

            <Link to={`/food/${item?._id}`}>
              <button className="btn btn-outline btn-warning mx-20 mb-0 text-xl">
                Details
              </button>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center my-12" to="/availableFood">
        <Link
          to="/availableFood"
          className="btn btn-outline btn-warning center text-xl mt-20"
        >
          Available Foods
        </Link>
      </div>
    </div>
  );
};

export default FeaturedFoods;
