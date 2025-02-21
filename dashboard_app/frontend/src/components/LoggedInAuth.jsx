import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function LoggedInAuth() {
  const { loggedInStatus } = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedInStatus) {
      navigate("/login");
    }
  }, [loggedInStatus, navigate])

  return loggedInStatus ? <Outlet /> : null
}

export default LoggedInAuth;
