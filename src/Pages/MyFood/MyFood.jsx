import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import MyFoodRow from "./MyFoodRow";

const MyFood = () => {
  const { user } = useContext(AuthContext);
  const [manage, setManage] = useState([]);

  useEffect(() => {
    fetch(
      `https://food-station-server-gamma.vercel.app/food?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setManage(data));
  }, [user]);
  if (!user) {
    // If user is null, return a loading indicator or handle it as appropriate
    return <div>Loading...</div>;
  }

  // Delete Operation
  const handleDelete = (id) => {
    const procceed = Swal.fire({
      title: "Do you want to delete?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Okay", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    if (procceed) {
      fetch(`https://food-station-server-gamma.vercel.app/food/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("Deleted Successfully");
            const remaining = manage.filter((food) => food._id !== id);
            setManage(remaining);
          }
        });
    }
  };
  const handleUpdate = (id) => {
    fetch(`https://food-station-server-gamma.vercel.app/food/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: confirm }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          // updated Count
          const remaining = manage.filter((food) => food._id !== id);
          const updated = manage.find((food) => food._id === id);
          updated.status = "confirm";
          const newFood = [updated, ...remaining];
          setManage(newFood);
        }
      });
  };
  return (
    <div>
      <Helmet>
        <title>Foodle | My Food</title>
      </Helmet>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-lg text-slate-300">
                <th>FOOD</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>UPDATE</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {manage.map((food) => (
                <MyFoodRow
                  key={food._id}
                  food={food}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                ></MyFoodRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyFood;
