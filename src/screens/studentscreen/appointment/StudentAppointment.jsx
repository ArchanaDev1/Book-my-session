import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import "./studentappointments.css";
import ScheduleAppointment from "../../../components/ScheduleAppointment/ScheduleAppointment";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import StudentAppointmentProfile from "../../../components/studentappointmentprofile/StudentAppointmentProfile";

const StudentAppointment = () => {
  const [showScheduleAppointment, setShowScheduleAppointment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [appointmentData, setAppointmentData] = useState({});
  const [showAppointmentProfile, setShowAppointmentProfile] = useState(false);
  const [reload, setReload] = useState(false);
  const [searchAppointment, setSearchAppointment] = useState("");

  const [student, setStudent] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("student"));
    if (!localStorage.getItem("student")) {
      navigate("/login");
    }
    else {
      setStudent(storedStudent);
    }
  }, [navigate]);

  // useEffect(() => {
  //   setStudent(JSON.parse(localStorage.getItem("student")));
  // }, [reload]);

  useEffect(() => {
    if (student?.id) {
      getAppointments();
    }
  }, [student, reload]);

  useEffect(() => {
    if (appointments.length > 0) {
      getTeachers();
    }
  }, [appointments]);

  const getAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/myappointments?id=${student.id}&user=student`
      );
      if (response.ok) {
        const appointments = await response.json();
        setAppointments(appointments.response);
        setLoading(false);
      } else {
        alert("Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      alert("error in getting appointments");
      setLoading(false);
    }
  };

  const getTeachers = async () => {
    const teacherIds = appointments.map((appointment) => appointment.teacherID);
    try {
      const response = await fetch("http://localhost:4000/api/teacher-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherIds),
      });
      if (response.ok) {
        const teachersData = await response.json();
        setTeachers(teachersData.response);
      } else {
        alert("Unable to get techers details!");
      }
    } catch (error) {
      alert("Getting error in teacher details!");
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

  const handleSearchAppointment = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/search-teacher-appointments?studentID=${student.id}&email=${searchAppointment}`
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
      {showAppointmentProfile ? (
        <StudentAppointmentProfile
          handleCancel={setShowAppointmentProfile}
          appointment={appointmentData}
          reload={(pre) => setReload(!pre)}
        />
      ) : null}
      {loading ? <Loader /> : null}
      {showScheduleAppointment ? (
        <ScheduleAppointment
          handleCancel={(value) => setShowScheduleAppointment(value)}
          reload={(pre) => setReload(!pre)} 
          token = {student.token}
        />
      ) : null}
      <section className="appointment-ribbon">
        <div className="appointment-search-bar">
          <input
            type="text"
            placeholder="Search appoinments..."
            className="search-input-box"
            onChange={(e)=>setSearchAppointment(e.target.value)}
          />
          <CiSearch className="appointment-search-icon pointer" onClick={handleSearchAppointment}/>
        </div>
        <div className="schedule-appointment-btn">
          <button onClick={() => setShowScheduleAppointment(true)}>
            Schedule Appointment
          </button>
        </div>
      </section>

      <section className="appointment-table-container">
          <table className="appointment-table teacher-table">
            <thead>
              <tr>
                <td>Teacher Name</td>
                <td>Teacher Email ID</td>
                <td>Scheduled Date & Time</td>
                <td>Status</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => {
                const teacher = teachers.find((teacher) => teacher.id === appointment.teacherID);
                return(
                <tr key={appointment._id}>
                  {/* <td>
                    {teachers.length > 0
                      ? teachers.filter(
                          (teacher) => teacher.id == appointment.teacherID
                        )[0].name
                      : null}
                  </td> */}
                  <td>{teacher ? teacher.name : "#NA"}</td>
                  {/* <td>
                    {teachers.length > 0
                      ? teachers.filter(
                          (teacher) => teacher.id == appointment.teacherID
                        )[0].email
                      : null}
                  </td> */}
                  <td>{teacher ? teacher.email : "#NA"}</td>
                  <td>
                    {formatDateString(appointment.appointmentDate)}
                    {`, ${appointment.appointmentTime.hour}:${appointment.appointmentTime.minute} ${appointment.appointmentTime.period}`}
                  </td>
                  <td>{appointment.status}</td>
                  <td>
                    <button
                      onClick={() => {
                        setAppointmentData({
                          ...appointment,
                          teacherName: teachers.filter(
                            (teacher) => teacher.id == appointment.teacherID
                          )[0].name,
                          teacherEmail: teachers.filter(
                            (teacher) => teacher.id == appointment.teacherID
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
              }
              )}
            </tbody>
          </table>
        
          {appointments.length<1?(<h1 className="not-found-message">Not found!</h1>):null}
        
      </section>
    </div>
  );
};

export default StudentAppointment;
