import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CountCard from "../../../components/countcard/CountCard";
import "./dashboard.css";

const Dashboard = () => {

  const [adminCount, setAdminCount] = useState(1)
  const [teacherCount, setTeacherCount] = useState(0)
  const [studentCount, setStudentCount] = useState(0)

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/admin/login");
    }
  }, []);

  const updateCount = async () => {
    try{
        const teachers = await fetch("http://localhost:4000/api/teachers");
        const students = await fetch("http://localhost:4000/api/students");
        if(teachers.status==200){
          const data = await teachers.json();
          setTeacherCount(data.response.length);
        }
        if(students.status==200){
          const data = await students.json();
          setStudentCount(data.response.length);
        }
    }
    catch(error){
      console.log("Error in getting count");
    }
  }

  useEffect(()=>{
    updateCount();
  },[])

  return (
    <div>
      <section className="card-container">
        <Link to="/admin/dashboard">
          <CountCard name="Admin" count="1" bgcolor="primary" color="white" />
        </Link>
        <Link to="/admin/teachers">
          <CountCard
            name="Teacher"
            count={teacherCount}
            bgcolor="secondary"
            color="white"
          />
        </Link>
        <Link to="/admin/students">
          <CountCard name="Student" count={studentCount} bgcolor="third" color="white" />
        </Link>
      </section>
    </div>
  );
};
export default Dashboard;
