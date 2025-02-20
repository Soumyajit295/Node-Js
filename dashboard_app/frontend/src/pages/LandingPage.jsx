import React from "react";
import { useSelector } from "react-redux"
import UserCard from "../components/userCard"
import { Link } from "react-router-dom";

function LandingPage() {
  const { loggedInStatus } = useSelector((state) => state.user);
  console.log(loggedInStatus);

  return (
    <div className="min-h-screen w-full flex justify-center items-center flex-col bg-slate-900 text-white">
      {!loggedInStatus ? (
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-semibold text-gray-300">
            Welcome to <span className="text-orange-500">Dashboard App</span> 
          </h1>
          <Link 
          to='/signup'
          className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500 text-white text-lg font-medium shadow-md transition cursor-pointer">
            Join Now 
          </Link>
        </div>
      ) : (
        <UserCard />
      )}
    </div>
  );
}

export default LandingPage;
