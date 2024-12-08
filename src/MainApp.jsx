import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Dashboard from "./screens/adminscreens/dashboard/Dashboard";
import TeacherScreen from "./screens/adminscreens/teacherscreen/TeacherScreen";
import SideBar from "./components/sidebar/SideBar";
import StudentScreen from "./screens/adminscreens/studentscreen/StudentScreen";
import LoginScreen from "./screens/adminscreens/loginscreen/LoginScreen";
import RegisterScreen from "./screens/adminscreens/registerscreen/RegisterScreen";
import TeacherLoginScreen from "./screens/teacherscreens/teacherloginscreen/TeacherloginScreen";
import Appointment from "./screens/teacherscreens/appointmentscreen/AppointmentScreen";
import TeacherMessages from "./screens/teacherscreens/teachermessages/TeacherMessages";
import Teachers from "./screens/studentscreen/teachers/Teachers";
import StudentLogin from "./screens/studentscreen/studentlogin/StudentLogin";
import StudentRegister from "./screens/studentscreen/studentregister/StudentRegister";
import NotFound from "./screens/notfound/NotFound";
import TeacherSideBar from "./components/teachersidebar/TeacherSideBar";
import StudentSideBar from "./components/studentsidebar/StudentSideBar";
import StudentAppointment from "./screens/studentscreen/appointment/StudentAppointment";
import StudentsScreen from "./screens/teacherscreens/studentsscreen/StudentsScreen";


const MainApp = () => {

  const location = useLocation();

  let showAdminSideBar =
    location.pathname == "/admin/dashboard" ||
    location.pathname == "/admin/teachers" ||
    location.pathname == "/admin/students";

  let showAdminForm =
    location.pathname == "/admin/login" ||
    location.pathname == "/admin/register";

  let showTeacherSideBar =
    location.pathname == "/teacher/appointments" ||
    location.pathname == "/teacher/messages" ||
    location.pathname == "/teacher/students";

  let showTeacherForm = location.pathname == "/teacher/login";

  let showStudentSideBar =
    location.pathname == "/" || location.pathname == "/appointments";

  let showStudentForm =
    location.pathname == "/login" || location.pathname == "/register";

  return (
    <>
      {showAdminSideBar ? (
        <SideBar>
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/teachers" element={<TeacherScreen />} />
            <Route path="/admin/students" element={<StudentScreen />} />
          </Routes>
        </SideBar>
      ) : showAdminForm ? (
        <Routes>
          <Route path="/admin/login" element={<LoginScreen />} />
          <Route path="admin/register" element={<RegisterScreen />} />
        </Routes>
      ) : showTeacherSideBar ? ( 
        <TeacherSideBar>
          <Routes>
            <Route path="/teacher/students" element={<StudentsScreen />} />
            <Route path="/teacher/appointments" element={<Appointment />} />
            <Route path="/teacher/messages" element={<TeacherMessages />} />
          </Routes>
        </TeacherSideBar>
      ) : showTeacherForm ? (
        <Routes>
          <Route path="/teacher/login" element={<TeacherLoginScreen />} />
        </Routes>
      ) : showStudentSideBar ? (
        <StudentSideBar>
          <Routes>
            <Route path="/" element={<Teachers />} />
            <Route path="/appointments" element={<StudentAppointment />} />
          </Routes>
        </StudentSideBar>
      ) : showStudentForm ? (
        <Routes>
          <Route path="/login" element={<StudentLogin />} />
          <Route path="/register" element={<StudentRegister />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};
export default MainApp;
