import React, { useEffect } from "react";
import LoginForm from "../../../components/login/LoginForm";

import { useNavigate } from "react-router-dom";

const StudentLogin = (props) => {
  const navigate = useNavigate();

  useEffect(()=>{
    if (!props.loggedIn) {
      localStorage.removeItem("student");
      navigate("/login");
    }
  },[])  

  const API = "http://localhost:4000/api/login";

  return (
    <div className="main">
      <LoginForm API={API} storageKey="student" redirect="/"/>
    </div>
  );
};

export default StudentLogin;
