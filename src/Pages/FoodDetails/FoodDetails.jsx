import { useState, useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import { Helmet } from "react-helmet-async";

const FoodDetails = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { state: { data, sendRequest } = {} } = location || {}; // Null check for location
  const { id } = useParams();
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [food, setFood] = useState([]);

  useEffect(() => {
    // Fetch food details if needed
    if (!data) {
      fetch(`http://localhost:5000/food/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFood(data);
          // console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching food details:", error);
        });
    }
  }, [food, id]);

  // Open Modal
  const openModal = () => {
    document.getElementById("my_modal_3").showModal();
  };

  // Close Modal
  const closeModal = () => {
    document.getElementById("my_modal_3").close();
  };

  // Handle Request Button Click
  const handleRequest = () => {
    // Prepare request data
    console.log("request Btn clicked");
    const requestData = {
      foodId: food._id,
      userId: user.id, // Assuming you have user id available
      additionalNotes: "", // Add any additional data you want to send
    };

    // Call sendRequest function passed from props
    sendRequest(requestData);
    console.log("Sending the request");
  };

  return (
    <div>
      <Helmet>
        <title>Foodle | Food Details</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={food?.food_image}
            className="max-w-sm rounded-lg shadow-2xl"
            alt={food?.food_name}
          />
          <div>
            <h1 className="text-5xl font-bold">{food?.food_name}</h1>
            <p className="pt-6">Quantity: {food?.food_quantity}</p>
            <p className="pb-2">Expired: {food?.expired_datetime}</p>
            <p>Donar Information:</p>
            <p className="">{food?.name || food?.donator?.name}</p>
            <p className="">{food?.pickup_location}</p>

            <button className="btn btn-outline btn-warning" onClick={openModal}>
              Request
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={closeModal}
                  >
                    ✕
                  </button>
                </form>
                <input
                  type="text"
                  disabled
                  defaultValue={food?.food_name}
                  placeholder="Type here"
                  className="input input-bordered input-warning w-full max-w-xs"
                />
                <input
                  type="text"
                  disabled
                  defaultValue={food?.food_image}
                  placeholder="Type here"
                  className="input input-bordered input-warning w-full max-w-xs"
                />
                <input
                  type="text"
                  disabled
                  defaultValue={food?._id}
                  placeholder="Type here"
                  className="input input-bordered input-warning w-full max-w-xs"
                />
                <input
                  type="text"
                  disabled
                  defaultValue={food?.donator?.name}
                  placeholder="Type here"
                  className="input input-bordered input-warning w-full max-w-xs"
                />
                <input
                  type="text"
                  disabled
                  defaultValue={food?.donator?.email}
                  placeholder="Type here"
                  className="input input-bordered input-warning w-full max-w-xs"
                />
                <input
                  type="text"
                  disabled
                  defaultValue={user?.email}
                  placeholder="Type here"
                  className="input input-bordered input-warning w-full max-w-xs"
                />
                <input
                  type="text"
                  defaultValue={new Date()}
                  disabled
                  placeholder="Type here"
                  className="input input-bordered input-warning w-full max-w-xs"
                />
                <input
                  type="text"
                  disabled
                  defaultValue={food?.pickup_location}
                  placeholder="Type here"
                  className="input input-bordered input-warning w-full max-w-xs"
                />
                <input
                  type="text"
                  disabled
                  defaultValue={food?.expired_datetime}
                  placeholder="Type here"
                  className="input input-bordered input-warning w-full max-w-xs"
                />
                <input
                  type="text"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Additional Notes"
                  className="input input-bordered input-warning w-full max-w-xs"
                />
                <button onClick={handleRequest}>Request</button>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
