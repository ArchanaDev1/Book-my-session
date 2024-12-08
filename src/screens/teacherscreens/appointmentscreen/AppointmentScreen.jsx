import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import "./appointmentscreen.css";
import { useNavigate } from "react-router-dom";
import AppointmentProfile from "../../../components/appointmentprofile/AppointmentProfile";
import TeacherScheduleAppointment from "../../../components/teacherscheduleappointment/TeacherScheduleAppointment";
import Loader from "../../../components/loader/Loader";

const Appointment = () => { 
  const [showScheduleAppointment, setShowScheduleAppointment] = useState(false);
  const [students, setStudents] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showAppointmentProfile, setShowAppointmentProfile] = useState(false);
  const [appointmentData, setAppointmentData] = useState({});
  const [teacher, setTeacher] = useState({});
  const [reload, setReload] = useState(false);
  const [searchAppointment, setSearchAppointment] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedTeacher = JSON.parse(localStorage.getItem("teacher"));
    if (!localStorage.getItem("teacher")) {
      navigate("/teacher/login");
    } else {
      setTeacher(storedTeacher);
    }
  }, [navigate]);

  useEffect(() => {
    if (teacher?.id) {
      getAppointments();
    }
  }, [teacher, reload]);

  useEffect(() => {
    if (appointments.length > 0) {
      getStudents();
    }
    console.log("Running")
  }, [appointments]);

  const getAppointments = async () => {
    try {
      console.log("Teacher", teacher);
      const response = await fetch(
        `http://localhost:4000/api/myappointments?id=${teacher.id}&user=teacher`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Appointments", appointments);
        setAppointments(data.response);
      } else {
        alert("Unable to get appointment details");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const formatDateString = (dateString) => {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Define options for formatting the date
    const options = { day: "numeric", month: "long", year: "numeric" };

    // Format the date using toLocaleDateString
    return date.toLocaleDateString("en-US", options);
  };

  const getStudents = async () => {
    console.log("Getting Student's data")
    const studentIds = appointments.map((appointment) => appointment.studentID);
    try {
      const response = await fetch("http://localhost:4000/api/student-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentIds),
      });
      if (response.ok) {
        const studentsData = await response.json();
        setStudents(studentsData.response);
      } else {
        alert("Unable to get students details!");
      }
    } catch (error) {
      alert("Getting error in students details!");
    }
  };

  const handleSearchAppointment = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/search-student-appointments?teacherID=${teacher.id}&email=${searchAppointment}`
      );
      if (response.ok) {
        const appointments = await response.json();
        console.log("Got appointments")
        console.log("Appointments", appointments.response);
        setAppointments(appointments.response);
        setLoading(false);
      } else {
        setLoading(false);
        setAppointments([]);
      }
    } catch (error) {
      alert("error in getting teachers");
      setLoading(false);
    }
  };

  return (
    <div className="screen" key={reload}>
      {loading ? <Loader /> : null}
      {showAppointmentProfile ? (
        <AppointmentProfile
          handleCancel={setShowAppointmentProfile}
          appointment={appointmentData}
          token = {teacher.token}
        />
      ) : null}
      {showScheduleAppointment ? ( 
        <TeacherScheduleAppointment
          handleCancel={(value) => setShowScheduleAppointment(value)}
          reload={(pre) => setReload(!pre)}
          token = {teacher.token}
        />
      ) : null}
      <section className="appointment-ribbon">
        <div className="appointment-search-bar">
          <input
            type="text"
            placeholder="Search appointment..."
            className="search-input-box"
            onChange={(e) => setSearchAppointment(e.target.value)}
          />
          <CiSearch
            className="appointment-search-icon pointer"
            onClick={handleSearchAppointment}
          />
        </div>
        <div className="schedule-appointment-btn">
          <button onClick={() => setShowScheduleAppointment(true)}>
            Schedule Appointment
          </button>
        </div>
      </section>

      <section className="appointment-table-container">
        <table className="appointment-table">
          <thead>
            <tr>
              <td>Appointment ID</td>
              <td>Student Name</td>
              <td>Student Email ID</td>
              <td>Scheduled Date & Time</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {

              const student = students.find((student) => student.id === appointment.studentID);
              return(
              <tr key={appointment._id}>
                <td>{appointment.id ? appointment.id : "#NA"}</td>
                {/* <td>
                  {students.length > 0
                    ? students.filter(
                        (student) => student.id == appointment.studentID
                      )[0].name
                    : null}
                </td> */}
                <td>{student ? student.name : "#NA"}</td>
                {/* <td>
                  {students.length > 0
                    ? students.filter(
                        (student) => student.id == appointment.studentID
                      )[0].email
                    : null}
                </td> */}
                <td>{student ? student.email : "#NA"}</td>
                <td>
                  {formatDateString(appointment.appointmentDate)}{" "}
                  {appointment.appointmentTime.hour}:
                  {appointment.appointmentTime.minute}{" "}
                  {appointment.appointmentTime.period}
                </td>
                <td>{appointment.status}</td>
                <td>
                  <button
                    onClick={() => {
                      setAppointmentData({
                        ...appointment,
                        studentName: students.filter(
                          (student) => student.id == appointment.studentID
                        )[0].name,
                        studentEmail: students.filter(
                          (student) => student.id == appointment.studentID
                        )[0].email,
                      });
                      setShowAppointmentProfile(true);
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
        {appointments.length < 1 ? (
          <h1 className="not-found-message">Not found!</h1>
        ) : null}
      </section>
    </div>
  );
};

export default Appointment;
