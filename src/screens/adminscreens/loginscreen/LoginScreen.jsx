import { useEffect } from "react";
import LoginForm from "../../../components/login/LoginForm";
import "./loginscreen.css"
import { useNavigate } from "react-router-dom";
const LoginScreen =()=>{

    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("admin")){
            navigate("/admin/dashboard");
        }
    },[])

    return(
        <div className="main">
        <LoginForm API="http://localhost:4000/api/admin-login" storageKey="admin" redirect="/admin/dashboard"/>
        </div>
    )
}
export default LoginScreen;