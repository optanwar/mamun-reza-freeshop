import React from "react";


const Login = React.lazy(() => import("./components/auth/Login.jsx"));
const Register = React.lazy(() => import("./components/auth/Register.jsx"));
const Welcome = React.lazy(() => import("./components/auth/Welcome.jsx"));
const Dashboard= React.lazy(() => import("./components/dashboard/Dashboard.jsx"));
const ProfileUpdate= React.lazy(() => import("./components/user/ProfileUpdate.jsx"));



export const route = [
  {
    id: 1,
    name: "Login",
    path: "/",
    component: Login // Do not wrap with <Home /> here
  },
  {
    id: 2,
    name: "Register",
    path: "/register",
    component: Register // Do not wrap with <Home /> here
  },
  {
    id: 3,
    name: "Welcome",
    path: "/welcome",
    component: Welcome // Do not wrap with <Home /> here
  },
 
  {
    id: 4,
    name: "Dashboard",
    path: "/dashboard",
    component: Dashboard // Do not wrap with <Home /> here
  },
  {
    id: 5,
    name: "Profile Update",
    path: "/profile-update",
    component: ProfileUpdate // Do not wrap with <Home /> here
  }
 
 
];