import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import toast from "react-hot-toast";

const FoodDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [food, setFood] = useState({});
  const [formData, setFormData] = useState({
    food_name: "",
    food_image: "",
    food_quantity: "",
    pickup_location: "",
    expired_datetime: "",
    additional_notes: "",
    donator_name: user?.displayName || "",
    donator_email: user?.email || "",
    donator_image: user?.photoURL || "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch food details and set state
    fetch(`http://localhost:5000/food/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
        setFormData({
          ...formData,
          food_name: data.food_name,
          food_image: data.food_image,
          food_quantity: data.food_quantity,
          pickup_location: data.pickup_location,
          expired_datetime: data.expired_datetime,
          additional_notes: data.additional_notes || "",
        });
      });
  }, [id]);

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const foodData = {
      ...formData,
      food_status: "requested",
      foodId: food._id,
      donator: {
        name: formData.donator_name,
        email: formData.donator_email,
      },
    };

    try {
      // Post the request
      await axios.post("http://localhost:5000/request", foodData);

      // Update the food status to 'requested'
      await axios.patch(`http://localhost:5000/food/${food._id}`, {
        status: "requested",
      });

      toast.success("Successfully requested the food.");
      navigate("/foodRequest");
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Failed to request the food. Please try again.");
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/food/${id}`);
      // toast.success("Food has been successfully deleted.");
      navigate("/foodRequest"); // Redirect to the available foods page
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete the food.");
    }
    //  onClick={() => handleDelete(food?._id)}
  };
  // console.log(food);
  return (
    <div>
      <Helmet>
        <title>Foodle | Food Details</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={food?.food_image}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{food?.food_name}</h1>
            <p className="py-6">Quantity: {food?.food_quantity}</p>
            <p className="py-6">Expired: {food?.expired_datetime}</p>
            <button
              className="btn btn-outline btn-warning"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Request
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form onSubmit={handleSubmit} className="card-body">
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_3").close()
                    }
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  >
                    ✕
                  </button>
                  <div>
                    <label className="label">Food Name</label>
                    <input
                      name="food_name"
                      value={formData.food_name}
                      onChange={handleInputChange}
                      disabled
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">Food Image</label>
                    <input
                      name="food_image"
                      value={formData.food_image}
                      onChange={handleInputChange}
                      disabled
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">Food Quantity</label>
                    <input
                      name="food_quantity"
                      value={formData.food_quantity}
                      onChange={handleInputChange}
                      disabled
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">Pickup Location</label>
                    <input
                      name="pickup_location"
                      value={formData.pickup_location}
                      onChange={handleInputChange}
                      disabled
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">Expired Date</label>
                    <input
                      name="expired_date"
                      value={formData.expired_date}
                      onChange={handleInputChange}
                      disabled
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">Additional Notes</label>
                    <input
                      name="additional_notes"
                      value={formData.additional_notes}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">Donator Name</label>
                    <input
                      name="donator_name"
                      value={formData.donator_name}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">Donator Email</label>
                    <input
                      name="donator_email"
                      value={formData.donator_email}
                      disabled
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => handleDelete(food?._id)}
                      type="submit"
                      className="btn btn-outline btn-warning"
                    >
                      Request Now
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
