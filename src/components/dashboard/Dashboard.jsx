import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from '../../slices/authSlice';
const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
  
    console.log(user, 5555)
  
    useEffect(() => {
     
      if (!user || !user.user || !user.user.data) {
        navigate("/");
      }
    }, [user, navigate]); 

    const handleLogout = () => {
      dispatch(logout());
      navigate('/'); // Redirect to home after logout
  };
  return (
    <div className='bg-dashboard-vector h-screen bg-no-repeat bg-contain  py-5 px-4 md:px-6 lg:px-20'>
      <div className='container mx-auto flex flex-col justify-center items-center'>
       <h1 className='text-white font-poppins text-xl font-semibold'>Dashboard</h1>
       <div className='flex justify-center items-center gap-4 mt-4'>

       <Link to="/profile-update" className="bg-primary hover:bg-[#158B9A] rounded-lg font-poppins font-bold text-base md:text-lg lg:text-xl text-white h-10 px-6 md:px-8 lg:px-10 transition-all duration-200 flex justify-center items-center">Update Profile</Link>

       <button   onClick={handleLogout}  className="bg-primary hover:bg-[#158B9A] rounded-lg font-poppins font-bold text-base md:text-lg lg:text-xl text-white h-10 px-6 md:px-8 lg:px-10 transition-all duration-200">
              Logout
              </button>
       </div>
      </div>
    </div>
  );
};

export default Dashboard;