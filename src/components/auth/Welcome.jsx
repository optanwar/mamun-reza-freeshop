import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";


const Welcome = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  console.log(user, 5555)

  useEffect(() => {
   
    if (!user || !user.user || !user.user.data) {
      navigate("/");
    }
  }, [user, navigate]); 

  return (
    <div className="bg-login-bg bg-cover h-screen flex items-center justify-center px-3 w-full py-6 md:py-16">
      <div className="bg-[#A5A5A538] backdrop-blur-md shadow-lg rounded-lg w-full md:w-10/12 lg:w-9/12 flex flex-col items-center justify-center h-full px-4 sm:px-6 py-6 md:py-10 lg:py-14 gap-8 md:gap-4">
        <div className="bg-white flex flex-col justify-center items-center py-10 md:py-16 lg:py-20 px-6 md:px-8 lg:px-10 rounded-lg gap-5 md:gap-7 lg:gap-10 w-3/4">
          {/* Logo */}
          <img
            src="/assets/logo.svg"
            alt="Logo"
            className="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40"
          />

          {/* Heading */}
          <div className="text-center">
            <h2 className="tracking-wide font-poppins font-bold text-xl md:text-3xl lg:text-4xl xl:text-5xl leading-10 text-black">
              Welcome
            </h2>
            <h2 className="tracking-wide font-poppins font-bold text-lg md:text-2xl lg:text-3xl xl:text-4xl leading-10 text-orange">
              to the Free Shops App Admin Panel
            </h2>
          </div>

          {/* Description */}
          <p className="text-center font-poppins font-normal text-base md:text-lg xl:text-xl text-lightGray w-3/4">
            Manage and monitor all aspects of your app seamlessly from one place. Use the tools below to get started.
          </p>

          {/* Get Started Button */}
          <div className="flex justify-center items-center w-full mt-5 md:mt-6 lg:mt-7">
            <Link to="/dashboard" className="bg-primary hover:bg-[#158B9A] rounded-lg font-poppins font-bold text-base md:text-lg lg:text-xl text-white h-10 px-6 md:px-8 lg:px-10 transition-all duration-200 flex justify-center items-center">Get Started</Link>
            
              
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
