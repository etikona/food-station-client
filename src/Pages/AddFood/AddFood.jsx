import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProviders";
import { Helmet } from "react-helmet-async";
// import axios from "axios";

const AddFood = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        food_name: data.food_name, // Adjusted field name
        food_image: data.food_image, // Adjusted field name
        food_quantity: data.food_quantity, // Adjusted field name
        pickup_location: data.pickup_location, // Adjusted field name
        expired_datetime: data.expired_date, // Adjusted field name
        additional_notes: data.additional_notes, // Adjusted field name
        food_status: data.food_status, // Adjusted field name
        name: data.name, // Adjusted field name
        email: data.email, // Adjusted field name
        image: data.image,
      };
      console.log(formattedData);
      const response = await fetch("http://localhost:5000/food", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData); // Log the response from the backend
        reset(); // Reset the form
      } else {
        console.error("Failed to add food");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Foodle |Add Food</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        {/* register your input into the hook by invoking the "register" function */}
        <div>
          <label className="label">
            <span className="label-text text-lg ">Food Name</span>
          </label>
          <input
            className="input input-bordered w-full outline text-yellow-600 font-bold"
            {...register("food_name", { required: true })}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text text-lg text-white">Food Image</span>
          </label>
          <input
            className="input input-bordered w-full  outline text-yellow-600 font-bold"
            {...register("food_image", { required: true })}
          />
        </div>

        {/* include validation with required or other standard HTML validation rules */}

        <div>
          <label className="label">
            <span className="label-text text-lg text-white">Food Quantity</span>
          </label>
          <input
            className="input input-bordered w-full outline  text-yellow-600 font-bold"
            {...register("food_quantity", { required: true })}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text text-lg text-white">
              Pickup Location
            </span>
          </label>
          <input
            className="input input-bordered w-full outline text-yellow-600 font-bold"
            {...register("pickup_location", { required: true })}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text text-lg text-white">Expired Date</span>
          </label>
          <input
            className="input input-bordered w-full outline text-yellow-600 font-bold"
            {...register("expired_date", { required: true })}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text text-lg text-white">
              Additional Notes
            </span>
          </label>
          <input
            className="input input-bordered w-full outline text-yellow-600 font-bold"
            {...register("additional_notes", { required: true })}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text text-lg text-white">Food Status</span>
          </label>
          <input
            defaultValue="Available"
            className="input input-bordered w-full outline text-yellow-600 font-bold"
            {...register("food_status", { required: true })}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text text-lg text-white">Donator Name</span>
          </label>
          <input
            defaultValue={user?.displayName}
            className="input input-bordered w-full outline text-yellow-600 font-bold"
            {...register("name", { required: true })}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text text-lg text-white">Donator Email</span>
          </label>
          <input
            defaultValue={user?.email}
            className="input input-bordered w-full outline text-yellow-600 font-bold"
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text text-lg text-white">Donator Image</span>
          </label>
          <input
            defaultValue={user?.photoURL}
            className="input input-bordered w-full outline text-yellow-600 font-bold"
            {...register("image", { required: true })}
          />
        </div>

        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        <div className="text-center">
          <input
            className=" btn mt-8 w-20 btn-outline btn-warning"
            value="Add"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default AddFood;
