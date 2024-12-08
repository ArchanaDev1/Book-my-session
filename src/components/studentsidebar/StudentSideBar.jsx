import "./studentsidebar.css";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";

const StudentSideBar = ({ children }) => {
  const [reload, setReload] = useState(false);
  const [student, setStudent] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("student");
    setReload((pre) => !pre);
  };

  useEffect(() => {
    setStudent(JSON.parse(localStorage.getItem("student")));
  }, []);

  return (
    <div key={reload} className="main-container flex-horizontal">
      <div className="side-bar">
        <div>
          <h1>BookMySession</h1>
        </div>
        <section className="link-list flex-vertical">
          <Link to="/" className="flex-horizontal link ">
            <div>{<FaUsers />}</div>
            <div>Teachers</div>
          </Link>
          <Link to="/appointments" className="flex-horizontal link">
            <div>{<FaChalkboardTeacher />}</div>
            <div>Appointments</div>
          </Link>
          <Link className="flex-horizontal link ">
            <div>
              <FiLogOut />
            </div>
            <div onClick={() => handleLogout()}>LogOut</div>
          </Link>
        </section>
      </div>
      <main className="main-screen">{children}</main>
    </div>
  );
};
export default StudentSideBar;
