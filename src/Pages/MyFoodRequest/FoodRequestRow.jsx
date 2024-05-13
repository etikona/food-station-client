const FoodRequestRow = ({ food }) => {
  const {
    additional_notes,
    email,
    expired_datetime,
    food_name,
    food_quantity,
    food_status,
    name,
    pickup_location,
  } = food;
  console.log(food);
  return (
    <tr>
      <td>{food_name}</td>
      <td>{email}</td>
      <td>{name}</td>
      <td>{food_status}</td>
      <td>{food_quantity}</td>
      <td>{pickup_location}</td>
      <td>{expired_datetime}</td>
      <td>{additional_notes}</td>
    </tr>
  );
};

export default FoodRequestRow;
