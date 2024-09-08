import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import Meta from "../Shared/Meta";
import { AuthContext } from "../../Providers/AuthProviders";
import { Helmet } from "react-helmet-async";
import logo from "../../../public/assets/logo.png";
const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    setError("");
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        console.log(result.user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Log in Successful",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid email or password! please try again");
      });
  };

  const provider = new GoogleAuthProvider();
  const handleGoogle = (e) => {
    e.preventDefault();
    setError("");
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);

        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };
  return (
    <>
      <Helmet>
        <title>Foodle | Login</title>
      </Helmet>
      <Meta title={"login"} />
      <div className="p-4 my-20">
        <div className="hero min-h-screen  shadow shadow-orange-400 rounded-2xl max-w-lg mx-auto">
          <div className="hero-content flex-col ">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-600">
                <span className="text-yellow-700">Foodle </span>Login
              </h1>
              <img
                className="h-[80px] rounded-full mx-auto mt-3"
                src={logo}
                alt="logo"
              />
            </div>
            <div className="card flex-shrink-0 w-full">
              <form onSubmit={handleLogIn} className="card-body">
                <div className="form-control">
                  <label className="label ">
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
                  <label className="label ">
                    <span className="label-text text-xl">Password</span>
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder="75G^if@001"
                    className="input input-bordered text-slate-50"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-outline btn-warning w-full text-xl">
                    Login
                  </button>
                </div>
                {error && <p className="text-red-600 mt-4">{error}</p>}
              </form>
              <div className="m-auto">
                <button onClick={handleGoogle} className="btn capitalize">
                  <FcGoogle className="text-2xl"></FcGoogle> Continue with
                  Google
                </button>
              </div>
              <div>
                <p className="my-5">
                  Do you need an? Please{" "}
                  <Link to="/register" className="text-red-500">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
