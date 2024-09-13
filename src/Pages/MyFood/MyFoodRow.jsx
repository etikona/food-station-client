import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProviders";
import axios from "axios";

const MyFoodRow = ({ food }) => {
  const { user } = useContext(AuthContext);
  const [selectedFood, setSelectedFood] = useState(null); // For holding selected food
  const [isModalOpen, setModalOpen] = useState(false); // For modal visibility

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle Delete
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      color: "#f7f9f9",
      icon: "warning",
      background: "#212f3d",
      showCancelButton: true,
      confirmButtonColor: "#b7950b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://food-station-server-blush.vercel.app/food/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your item has been deleted.",
                "success"
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }
          });
      }
    });
  };

  // Handle Update Submit
  const onSubmit = async (data) => {
    try {
      const formattedData = {
        food_name: data.food_name,
        food_image: data.food_image,
        food_quantity: data.food_quantity,
        pickup_location: data.pickup_location,
        expired_datetime: new Date(data.expired_date)
          .toISOString()
          .split("T")[0], // Ensure the date is formatted correctly
        additional_notes: data.additional_notes,
        food_status: data.food_status,
        name: data.name,
        email: data.email,
      };

      console.log("Formatted data for update:", formattedData); // Check the data being sent

      // Send patch request with the correct headers
      const response = await axios.patch(
        `https://food-station-server-blush.vercel.app/food/${selectedFood._id}`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Server response:", response);

      if (response.status === 200 || response.status === 204) {
        toast.success("Food updated successfully!");
        reset();
        setModalOpen(false);
        setSelectedFood(null);
      } else {
        throw new Error("Failed to update food");
      }
    } catch (error) {
      console.error("Error occurred while updating:", error);
      toast.error(`Failed to update food: ${error.message}`);
    }
  };

  // Open Modal and set the selected food
  const openModal = (foodItem) => {
    setSelectedFood(foodItem); // Set the selected food item
    setModalOpen(true); // Show the modal
  };

  // Close Modal
  const closeModal = () => {
    setModalOpen(false); // Hide the modal
    setSelectedFood(null); // Clear the selected food item
  };

  return (
    <>
      <tr className="text-lg text-slate-300">
        <td>{food.food_name}</td>
        <td>{food.name}</td>
        <td>{food.email}</td>
        <td>
          <button
            className="btn hover:bg-green-600 hover:text-slate-100"
            onClick={() => openModal(food)} // Open modal with selected food
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
          {isModalOpen &&
            selectedFood && ( // Render modal only if it's open and food is selected
              <dialog open className="modal">
                <div className="modal-box">
                  <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <button
                      onClick={closeModal}
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                      ✕
                    </button>

                    {/* Form fields with selected food data */}
                    <div>
                      <label className="label">
                        <span className="label-text text-lg">Food Name</span>
                      </label>
                      <input
                        className="input input-bordered w-full outline text-yellow-600 font-bold"
                        {...register("food_name", { required: true })}
                        defaultValue={selectedFood.food_name}
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text text-lg">Food Image</span>
                      </label>
                      <input
                        className="input input-bordered w-full outline text-yellow-600 font-bold"
                        {...register("food_image", { required: true })}
                        defaultValue={selectedFood.food_image}
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text text-lg">
                          Food Quantity
                        </span>
                      </label>
                      <input
                        className="input input-bordered w-full outline text-yellow-600 font-bold"
                        {...register("food_quantity", { required: true })}
                        defaultValue={selectedFood.food_quantity}
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text text-lg">
                          Pickup Location
                        </span>
                      </label>
                      <input
                        className="input input-bordered w-full outline text-yellow-600 font-bold"
                        {...register("pickup_location", { required: true })}
                        defaultValue={selectedFood.pickup_location}
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text text-lg">Expired Date</span>
                      </label>
                      <input
                        type="date" // Change input type to date for valid date format
                        className="input input-bordered w-full outline text-yellow-600 font-bold"
                        {...register("expired_date", { required: true })}
                        defaultValue={
                          selectedFood?.expired_datetime?.split("T")[0]
                        } // Show in YYYY-MM-DD format
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text text-lg">
                          Additional Notes
                        </span>
                      </label>
                      <input
                        className="input input-bordered w-full outline text-yellow-600 font-bold"
                        {...register("additional_notes", { required: true })}
                        defaultValue={selectedFood.additional_notes}
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text text-lg">Food Status</span>
                      </label>
                      <input
                        className="input input-bordered w-full outline text-yellow-600 font-bold"
                        {...register("food_status", { required: true })}
                        defaultValue={selectedFood.food_status || "Available"}
                      />
                    </div>

                    {/* Default Values for Donor Info */}
                    <div>
                      <label className="label">
                        <span className="label-text text-lg">Donor Name</span>
                      </label>
                      <input
                        className="input input-bordered w-full outline text-yellow-600 font-bold"
                        {...register("name", { required: true })}
                        defaultValue={user?.displayName}
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text text-lg">Donor Email</span>
                      </label>
                      <input
                        className="input input-bordered w-full outline text-yellow-600 font-bold"
                        {...register("email", { required: true })}
                        defaultValue={user?.email}
                      />
                    </div>

                    <div className="text-center">
                      <input
                        className="btn mt-8 w-1/4 text-lg btn-outline btn-warning"
                        value="Update"
                        type="submit"
                      />
                    </div>
                  </form>
                </div>
              </dialog>
            )}
        </td>
        <td>
          <button
            onClick={() => handleDelete(food?._id)}
            className="btn hover:bg-red-600 hover:text-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </td>
      </tr>
    </>
  );
};

export default MyFoodRow;
