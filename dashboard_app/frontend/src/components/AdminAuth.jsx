import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function AdminAuth() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.role !== "admin") {
      navigate("/unauthorized");
    }
  }, [userData, navigate]);

  return userData?.role === "admin" ? <Outlet /> : null;
}

export default AdminAuth;
