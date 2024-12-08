import { useEffect } from "react";
import LoginForm from "../../../components/login/LoginForm";
import "./teacherloginscreen.css"
import { useNavigate } from "react-router-dom";
const TeacherLoginScreen = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("teacher")){
            navigate("/teacher/students");
        }
    },[])

    return (
        <div className="main">
            <LoginForm API="http://localhost:4000/api/teacher-login" storageKey="teacher" redirect="/teacher/students"/>
        </div>
    )
}
export default TeacherLoginScreen;