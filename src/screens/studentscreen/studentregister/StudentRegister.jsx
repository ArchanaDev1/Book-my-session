import React from "react";
import StudentRegisterForm from "../../../components/studentregisterform/StudentRegisterForm";

const StudentRegister = () => {
  const API = 'http://localhost:4000/api/add-student'
  return (
    <div className="register">
      <StudentRegisterForm API={API}/>
    </div>
  );
};

export default StudentRegister;
