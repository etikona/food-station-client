// import { Link } from "react-router-dom";
import Meta from "../Shared/Meta";

const Error = () => {
  return (
    <>
      <Meta title={"404"}></Meta>
      <div>
        <img
          className="w-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFvhxwkm_iQjUV8_1S_PbBeGN8TkVWnk2tRE44giKEUHkQGO5cyCbPCEgmcc45S0mu2Gc&usqp=CAU"
          alt="not found"
        />
      </div>
      {/* <h2 className="text-xl text-center">404 Not Found</h2> */}
    </>
  );
};

export default Error;
