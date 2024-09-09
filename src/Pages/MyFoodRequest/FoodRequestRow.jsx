const FoodRequestRow = ({ food }) => {
  const {
    additional_notes,
    donator,
    expired_datetime,
    food_name,
    food_quantity,
    food_status,
    pickup_location,
  } = food;
  console.log(food);
  return (
    <tr className="text-xl text-slate-300">
      <td>{food_name}</td>
      <td>{donator?.email}</td>
      <td>{donator?.name}</td>
      <td>{food_status}</td>
      <td>{food_quantity}</td>
      <td>{pickup_location}</td>
      <td>{expired_datetime}</td>
      <td>{additional_notes}</td>
    </tr>
  );
};

export default FoodRequestRow;
