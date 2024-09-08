// import { Link } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// import { useHistory } from "react-router-dom";
import UpdateFood from "./UpdateFood";
const MyFoodRow = ({ food }) => {
  const [foodToUpdate, setFoodToUpdate] = useState(null);
  const {
    _id,

    email,

    food_name,

    name,
  } = food;
  // console.log(food);

  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/food/${_id}`, {
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

              // const remain = myOrder.filter(cart => cart._id !== _id);
              // console.log(remain);
              // setMyOrder(remain);
            }
          });
      }
    });
  };

  const HandleUpdateFood = (food) => {
    console.log("Update btn clicked");
    console.log(food);
  };

  const closeUpdateModal = () => {
    // setFoodToUpdate(null);
  };
  return (
    <>
      <tr>
        <td>{food_name}</td>
        <td>{name}</td>
        <td>{email}</td>

        <td>
          <Link to="/updateFood">
            <button onClick={() => HandleUpdateFood(food)}>Update</button>
          </Link>
        </td>
        <td>
          <button onClick={() => handleDelete(_id)} className="btn">
            Delete
          </button>
        </td>
      </tr>
      {foodToUpdate && (
        <UpdateFood food={foodToUpdate} closeModal={closeUpdateModal} />
      )}
    </>
  );
};

export default MyFoodRow;
