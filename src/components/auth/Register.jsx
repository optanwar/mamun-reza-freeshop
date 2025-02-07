import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2"; 
import Loader from "../../layout/Loader";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, successMessage, user } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
        

    if (user && user.accessToken) {
      navigate("/dashboard");
    }


    if (user && user?.data) {
      Swal.fire({
        icon: "success",
        title: successMessage,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => navigate("/welcome"));
    }


    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }


    

    // Clean-up 
    return () => {
      
      if (Swal.isVisible()) {
        Swal.close();
      }
    };
  }, [successMessage, error, navigate, loading, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(userData).some((field) => field.trim() === "")) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "All fields are required.",
      });
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(userData.email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    if (userData.password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters long.",
      });
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords Do Not Match",
        text: "Please make sure both passwords match.",
      });
      return;
    }

    dispatch(registerUser(userData));
  };

  return (
    <div className="bg-login-bg bg-cover h-full lg:h-screen flex items-center justify-center px-3 w-full py-6 md:py-16">
      <div className="bg-[#A5A5A538] backdrop-blur-md shadow-lg rounded-lg w-full md:w-10/12 lg:w-9/12 flex flex-col items-center lg:flex-row md:justify-evenly px-4 sm:px-6 py-6 md:py-10 lg:py-14 gap-8 md:gap-4">
        <div className="flex justify-center items-center w-full md:w-2/5">
          <img
            src="/assets/logo.svg"
            alt="logo"
            className="h-32 w-32 md:w-40 md:h-40 lg:w-52 lg:h-52 xl:w-60 xl:h-60"
          />
        </div>

        <div className="hidden lg:flex justify-center items-center">
          <img
            src="/assets/login-vector.svg"
            alt="Login Vector"
            className="h-[calc(100vh-200px)]"
          />
        </div>

        <div className="flex flex-col h-auto items-start bg-white py-6 px-6 md:py-8 lg:py-9 lg:px-9 rounded-lg justify-between w-full sm:w-9/12 md:w-7/12 lg:w-7/12 xl:w-2/5">
          <div className="w-full flex flex-col justify-center items-start gap-0.5">
            <h3 className="font-poppins font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              Create New Account
            </h3>
            <p className="font-poppins font-normal text-sm text-lightGray">
              Welcome to Free Shops App Controller
            </p>
          </div>

          <form
            className="w-full flex flex-col gap-2 md:gap-4 mt-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col justify-center items-start gap-0.5 w-full">
              <label
                htmlFor="name"
                className="font-poppins font-semibold text-sm text-black"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="font-poppins text-sm outline-none w-full h-10 border border-gray-300 rounded-lg px-3"
                required
              />
            </div>

            <div className="flex flex-col justify-center items-start gap-0.5 w-full">
              <label
                htmlFor="email"
                className="font-poppins font-semibold text-sm text-black"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="font-poppins text-sm outline-none w-full h-10 border border-gray-300 rounded-lg px-3"
                required
              />
            </div>

            <div className="flex flex-col justify-center items-start gap-0.5 w-full">
              <label
                htmlFor="phone"
                className="font-poppins font-semibold text-sm text-black"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Phone Number"
                value={userData.phone}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    setUserData({ ...userData, phone: e.target.value });
                  }
                }}
                className="font-poppins text-sm outline-none w-full h-10 border border-gray-300 rounded-lg px-3"
                required
              />
            </div>

            <div className="flex flex-col justify-center items-start gap-0.5 w-full">
              <label
                htmlFor="password"
                className="font-poppins font-semibold text-sm text-black"
              >
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  className="font-poppins text-sm outline-none w-full h-10 border border-gray-300 rounded-lg px-3"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2.5 right-2"
                >
                  <img
                    src={showPassword ? "/assets/eye-off.svg" : "/assets/eye.svg"}
                    alt="eye"
                    className="h-4 w-4"
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center items-start gap-0.5 w-full">
              <label
                htmlFor="confirm-password"
                className="font-poppins font-semibold text-sm text-black"
              >
                Confirm Password
              </label>
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Confirm Password"
                  value={userData.confirmPassword}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="font-poppins text-sm outline-none w-full h-10 border border-gray-300 rounded-lg px-3"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-2.5 right-2"
                >
                  <img
                    src={
                      showConfirmPassword ? "/assets/eye-off.svg" : "/assets/eye.svg"
                    }
                    alt="eye"
                    className="h-4 w-4"
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-3 bg-primary text-white rounded-lg"
              disabled={loading}
            >
              {loading ? <Loader /> : "Create Account"}
            </button>
          </form>
           <Link to="/" className="w-full">
                        <p className="font-poppins font-medium text-sm md:text-base text-[#7CB5EC] text-center mt-10 md:mt-12 w-full xl:mt-14 cursor-pointer">Already have an account?</p>
                      </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
