import { CiEdit } from "react-icons/ci";

const MyFoodRow = ({ food, handleDelete, handleUpdate }) => {
  const {
    food_name,
    _id,
    pickup_location,
    expired_datetime,
    additional_notes,
  } = food;

  return (
    <tr>
      <th></th>
      <td>{food_name}</td>
      <td>
        <button
          // eslint-disable-next-line react/jsx-no-duplicate-props
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <CiEdit />
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <input
              type="text"
              defaultValue={food_name}
              placeholder="Type here"
              className="input  input-bordered input-warning w-full max-w-xs"
            />

            <input
              type="text"
              disabled
              defaultValue={pickup_location}
              placeholder="Type here"
              className="input input-bordered input-warning w-full max-w-xs"
            />

            <input
              type="text"
              disabled
              defaultValue={expired_datetime}
              placeholder="Type here"
              className="input input-bordered input-warning w-full max-w-xs"
            />
            <input
              type="text"
              defaultValue={additional_notes}
              placeholder="Additional Notes"
              className="input input-bordered input-warning w-full max-w-xs"
            />
            <button
              className="btn btn-outline btn-warning"
              onClick={() => handleUpdate(_id)}
            >
              UPDATE
            </button>
          </div>
        </dialog>
      </td>
      <td>
        <button onClick={() => handleDelete(_id)} className="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default MyFoodRow;
