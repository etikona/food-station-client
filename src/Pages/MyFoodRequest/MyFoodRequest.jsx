// import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
// import { AuthContext } from "../../Providers/AuthProviders";
import FoodRequestRow from "./FoodRequestRow";

const MyFoodRequest = () => {
  const data = useLoaderData();
  console.log(data);
  console.log(data);
  // const { user } = useContext(AuthContext);
  // const [request, setRequest] = useState([]);

  // useEffect(() => {
  //   fetch(`https://food-station-server-blush.vercel.app/request/${user.email}`)
  //     .then((res) => res.json())
  //     .then((data) => setRequest(data));
  // }, []);

  return (
    <div>
      <Helmet>
        <title>Foodle |My Food Request</title>
      </Helmet>

      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr className="text-lg text-slate-300">
                <th>Food Name </th>
                <th>Email</th>
                <th>Name</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Pickup Location</th>
                <th>Date</th>
                <th>Additional Notes</th>
              </tr>
            </thead>
            <tbody>
              {data.map((food) => (
                <FoodRequestRow key={food._id} food={food}></FoodRequestRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyFoodRequest;
