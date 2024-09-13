import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../Providers/AuthProvider";
// import Swal from "sweetalert2";
import Meta from "../Shared/Meta";
import { AuthContext } from "../../Providers/AuthProviders";
import { Helmet } from "react-helmet-async";
import logo from "../../../public/assets/logo.png";

const Registration = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const SignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(name, photo, email, password);

    const capitalLetter = /[A-Z]/;
    const specialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    setError("");
    setSuccess("");
    if (password.length < 6) {
      setError("PassWord should be 6 character or more!!");
      return;
    }
    if (!capitalLetter.test(password)) {
      setError("Your PassWord should have at least one Capital Later");
      return;
    }
    if (!specialCharacter.test(password)) {
      setError("Your PassWord should have at least one special character");
      return;
    }

    // ! Create User
    // createUser(email, password).then((res) => {
    //   console.log(res);
    //   const user = res.user;
    //   fetch("https://food-station-server-blush.vercel.app/users", {
    //         method: "POST",
    //          headers: {
    //          "content-type": "application/json",
    //           },
    //          body: JSON.stringify(user),
    //        })
    //        .then((res) => res.json())
    //         .then((data) => {
    //           console.log(data, "user created successfully");
    //            setSuccess("User created successfully!");
    // })
    createUser(email, password)
      .then((result) => {
        const user = { email, password, name, photo };

        fetch("https://food-station-server-blush.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "user created successfully");
            setSuccess("User created successfully!");
            // Swal.fire({
            //   position: "center",
            //   icon: "success",
            //   title: "Registration Successful",
            //   showConfirmButton: false,
            //   timer: 3000,
            // });
            navigate("/");
          });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Foodle |Registration</title>
      </Helmet>
      <Meta title={"signup"}></Meta>
      <div className="my-20">
        <div className="p-4 ">
          <div className="hero min-h-screen   shadow shadow-orange-400 rounded-2xl max-w-lg mx-auto">
            <div className="hero-content flex-col ">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold text-gray-600">
                  <span className="text-yellow-700">FOODLE </span>Sign Up
                </h1>
                <img
                  className="h-[80px] rounded-full mx-auto mt-3"
                  src={logo}
                  alt="logo"
                />
              </div>
              <div className="card flex-shrink-0 w-full">
                <form onSubmit={SignUp} className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl">Name</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="John Dean"
                      className="input input-bordered text-slate-50 w-80"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl">Photo URL</span>
                    </label>
                    <input
                      name="photo"
                      type="text"
                      placeholder="Photo URL"
                      className="input input-bordered text-slate-50 w-80"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl">Email</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="John@gmail.com"
                      className="input input-bordered text-slate-50 w-80"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl">Password</span>
                    </label>
                    <input
                      name="password"
                      type="password"
                      placeholder="75G^if@001"
                      className="input input-bordered text-slate-50 w-80"
                      required
                    />
                  </div>
                  <div className="form-control mt-6 w-full">
                    <button className="btn btn-outline btn-warning w-full text-xl">
                      Register
                    </button>
                    {error && <p className="text-red-600 pt-4">{error}</p>}
                    {success && <p>{success}</p>}
                  </div>
                </form>
                <div>
                  <p className="my-5">
                    Do you need an account? Please{" "}
                    <Link to="/login" className="text-red-500">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
