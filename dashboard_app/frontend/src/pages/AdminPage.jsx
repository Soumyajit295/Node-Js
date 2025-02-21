import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from '../Redux/Slices/userSlice';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  // Assuming the logged-in user's email is stored in local storage or Redux
  const loggedInUserEmail = JSON.parse(localStorage.getItem("userData")) || "example@email.com"; // Change this accordingly

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await dispatch(getUsers());
      if (res?.payload?.success) {
        setUsers(res?.payload?.data);
      } else {
        setUsers([]);
      }
    };

    fetchUsers();
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen p-4">
      <h1 className="text-xl font-semibold mb-4 text-slate-200">Total Users: {users.length}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-md relative ${
              user.email === loggedInUserEmail.email ? "border-2 border-blue-500" : ""
            }`}
          >
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <h2 className="text-lg font-semibold text-white">
                {user.name} {user.email === loggedInUserEmail && <span className="text-blue-400">(Me)</span>}
              </h2>
              <p className="text-gray-400">{user.email}</p>
            </div>
            {user.email === loggedInUserEmail && (
              <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">You</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
