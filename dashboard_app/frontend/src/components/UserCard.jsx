import React, { useEffect, useState } from "react";
import { FiEdit3, FiSave } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { editName, getProfile } from "../Redux/Slices/userSlice";
import { useNavigate } from "react-router-dom";

function UserCard() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData); // Get user data from Redux
  const [isEdit, setIsEdit] = useState(false);
  const [editedName, setEditedName] = useState("");

  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (userData?.name) {
      setEditedName(userData.name);
    }
  }, [userData]);

  const onSave = async () => {
    const res = await dispatch(
      editName({ userId: userData._id, name: editedName })
    );
    console.log("API Response:", res);

    if (res?.payload?.success) {
      setIsEdit(false);
    } else {
      console.error("Update failed:", res);
    }
  };

  return (
    <div className="w-[420px] h-[200px] bg-gradient-to-r from-slate-900 to-slate-700 rounded-2xl shadow-lg p-5 flex items-center text-white">
      <div className="w-1/3 flex justify-center items-center">
        <img
          className="w-24 h-24 rounded-full border-4 border-gray-500 shadow-md object-cover"
          src={userData?.avatar}
          alt="User"
        />
      </div>

      <div className="h-[70%] w-[2px] bg-gray-400 opacity-50 mx-3"></div>

      <div className="w-2/3 flex flex-col justify-between gap-5 p-5">
        <div className="flex items-center justify-between">
          {isEdit ? (
            <input
              className="border border-slate-500 rounded-md p-1 w-2/3 text-white"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              type="text"
            />
          ) : (
            <h1 className="text-lg font-semibold">Name: {userData?.name}</h1>
          )}
          {isEdit ? (
            <button
              onClick={onSave}
              className="w-8 h-8 flex justify-center items-center bg-green-600 hover:bg-green-500 rounded-full shadow-md transition cursor-pointer"
            >
              <FiSave className="text-white text-lg" />
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="w-8 h-8 flex justify-center items-center bg-blue-600 hover:bg-blue-500 rounded-full shadow-md transition cursor-pointer"
            >
              <FiEdit3 className="text-white text-lg" />
            </button>
          )}
        </div>
        <div>
          <h1 className="text-gray-300">Email: {userData?.email}</h1>
        </div>
        <button 
        onClick={()=>navigate('/sendotp')}
        className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-md transition cursor-pointer">
          <AiFillDelete className="text-lg" />
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  );
}

export default UserCard;
