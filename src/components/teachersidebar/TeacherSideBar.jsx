import "./teachersidebar.css";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
const TeacherSideBar = ({ children }) => {
  const [teacher, setTeacher] = useState({});

  const [reload, setReload] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("teacher");
    setReload((pre) => !pre);
  };

  useEffect(() => {
    setTeacher(JSON.parse(localStorage.getItem("teacher")));
  }, []);

  return (
    <div className="main-container flex-horizontal" key={reload}>
      <div className="side-bar">
        <div>
          <h1>BookMySession</h1>
        </div>
        <section className="link-list flex-vertical">
          <Link to="/teacher/students" className="flex-horizontal link ">
            <div>{<FaUsers />}</div>
            <div>Students </div>
          </Link>
          <Link to="/teacher/appointments" className="flex-horizontal link">
            <div>{<FaChalkboardTeacher />}</div>
            <div>Appointments</div>
          </Link>

          <Link className="flex-horizontal link ">
            <div>
              <FiLogOut />
            </div>
            <div onClick={handleLogout}>LogOut</div>
          </Link>
        </section>
      </div>
      <main className="main-screen">{children}</main>
    </div>
  );
};
export default TeacherSideBar;
