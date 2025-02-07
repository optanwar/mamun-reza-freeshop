import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../../slices/userSlice";

const ProfileUpdate = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user }= useSelector((state) => state.user);
  const userData = user?.user?.data;

  useEffect(() => {
    if (!userData) {
      navigate("/");
    } else {
      // Populate form data with user details
      setFormData({
        fullName: userData.fullName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        password: "",
      });
    }
    dispatch(getUserProfile());
  }, [userData, navigate, dispatch]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="bg-login-bg bg-cover h-screen flex items-center justify-center px-3 w-full py-6 md:py-16">
      <div className="bg-[#A5A5A538] backdrop-blur-md shadow-lg rounded-lg w-full md:w-10/12 lg:w-9/12 flex flex-col items-center justify-center h-full px-4 sm:px-6 py-6 md:py-10 lg:py-14 gap-8 md:gap-4">
        <div className="relative bg-white flex flex-col justify-center items-center py-8 md:py-10 lg:py-14 px-6 md:px-8 lg:px-10 rounded-lg gap-5 md:gap-7 lg:gap-10 w-3/4 lg:w-1/2 xl:w-2/5">
          <Link to="/dashboard" className="absolute right-4 top-5">
            <p className="font-poppins font-normal text-lightGray text-sm cursor-pointer hover:text-gray-700 transition-all duration-200">
              Skip
            </p>
          </Link>
          <form className="w-full flex flex-col gap-2 md:gap-4 mt-6">
            <div className="relative w-fit mx-auto">
              <label className="cursor-pointer flex justify-center items-center bg-[#D9D9D9] rounded-full w-24 h-24 overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover object-top"
                    title="Upload Image"
                  />
                ) : (
                  <img
                    src="/assets/camera.svg"
                    alt="Upload"
                    className="w-10 h-10"
                    title="Upload Image"
                  />
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            </div>

            <div className="flex flex-col justify-center items-start gap-0.5 w-full">
              <label
                htmlFor="fullName"
                className="font-poppins font-semibold text-sm text-black"
              >
                Your Name
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your Name"
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
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
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
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
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
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="font-poppins text-sm outline-none w-full h-10 border border-gray-300 rounded-lg px-3"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-2"
                >
                  <img
                    src={showPassword ? "/assets/eye-off.svg" : "/assets/eye.svg"}
                    alt="eye"
                    className="h-4 w-4"
                  />
                </button>
                <p className="text-center w-fit mx-auto font-poppins font-normal text-sm mt-0.5 text-lightGray cursor-pointer hover:text-gray-700 transition-all duration-200">
                  Change Password
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center w-full mt-5 md:mt-6 lg:mt-7">
              <button
                type="submit"
                className="bg-primary hover:bg-[#158B9A] rounded-lg font-poppins font-bold text-base md:text-lg lg:text-xl text-white h-10 px-6 md:px-8 lg:px-10 transition-all duration-200"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
