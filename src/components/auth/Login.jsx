import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.user);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await dispatch(loginUser({ email, password })).unwrap();
      if (response?.accessToken) {
        navigate("/dashboard");
      } else {
        console.error("Login failed, no user data found");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  useEffect(() => {
    if (user && user.accessToken) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="bg-login-bg bg-cover h-screen sm:h-full lg:h-screen flex items-center justify-center px-3 w-full py-6 md:py-16">
      <div className="bg-[#A5A5A538] backdrop-blur-md shadow-lg rounded-lg w-full md:w-10/12 lg:w-9/12 flex flex-col items-center lg:flex-row md:justify-evenly h-full px-4 sm:px-6 py-6 md:py-10 lg:py-14 gap-8 md:gap-4">
        <div className="flex justify-center items-center w-full md:w-2/5">
          <img src="/assets/logo.svg" alt="logo" className="h-32 w-32 md:w-40 md:h-40 lg:w-52 lg:h-52 xl:w-60 xl:h-60" />
        </div>

        <div className="hidden lg:flex justify-center items-center">
          <img src="/assets/login-vector.svg" alt="Login Vector" className="h-[calc(100vh-200px)]" />
        </div>

        <div className="flex flex-col h-auto items-start bg-white py-6 px-6 md:py-8 lg:py-9 lg:px-9 rounded-lg justify-between w-full sm:w-9/12 md:w-7/12 lg:w-2/5">
          <div className="w-full flex flex-col justify-center items-start gap-0.5">
            <h3 className="font-poppins font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl">Log in</h3>
            <p className="font-poppins font-normal text-sm text-lightGray">Welcome to Free Shops App Controller</p>
          </div>

          <form className="w-full flex flex-col gap-4 md:gap-6 lg:gap-8 xl:gap-9 mt-10 md:mt-14 lg:mt-16 xl:mt-20" onSubmit={handleLogin}>
            <div className="flex flex-col justify-center items-start gap-0.5 w-full">
              <label htmlFor="email" className="font-poppins font-semibold text-sm text-black">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className={`font-poppins text-sm outline-none w-full h-10 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg px-3`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="flex flex-col justify-center items-start gap-0.5 w-full">
              <label htmlFor="password" className="font-poppins font-semibold text-sm text-black">Password</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  className={`font-poppins text-sm outline-none w-full h-10 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg px-3`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={togglePasswordVisibility}>
                  <img src={showPassword ? "/assets/eye-off.svg" : "/assets/eye.svg"} alt="eye" className="h-4 w-4 absolute top-3 right-2" />
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            {error && <p className="text-red-500 text-sm text-center ">{error}</p>}

            <p className="font-poppins  text-center w-full font-normal text-sm text-lightGray cursor-pointer">Forgot Password?</p>

            <div className="flex justify-center items-center w-full mt-5 md:mt-6 lg:mt-7">
              <button type="submit" className="bg-primary hover:bg-[#158B9A] rounded-lg font-poppins font-bold text-base md:text-lg lg:text-xl text-white h-10 px-6 md:px-8 lg:px-10 transition-all duration-200" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </button>
            </div>

            <Link to="/register" className="w-full">
              <p className="font-poppins font-medium text-sm md:text-base text-[#7CB5EC] text-center mt-10 md:mt-12 w-full xl:mt-14 cursor-pointer">Create New Account</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
