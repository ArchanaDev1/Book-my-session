import React, { useEffect, useState } from "react";
import "./teacherscheduleappointment.css";
import { IoIosClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Calendar from "../Calendar/Calendar";
import TimePicker from "../TimePicker/TimePicker";
import StudentPicker from "../StudentPicker/StudentPicker";
import Loader from "../loader/Loader";

const TeacherScheduleAppointment = (props) => {
  const [showSearchStudent, setShowSearchStudent] = useState(false);
  const [student, setStudent] = useState("");
  const [teacher, setTeacher] = useState("");
  const [time, setTime] = useState({});
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const [appointment, setAppointment] = useState({
    studentID: "",
    teacherID: "",
    appointmentDate: "",
    appointmentTime: {
      hour: "",
      minute: "",
      period: "",
    },
    appointmentLocation: "",
    message: "",
  });

  useEffect(() => {
    setAppointment((pre) => ({
      ...pre,
      appointmentTime: time,
      appointmentLocation: selectedLocation,
      appointmentDate: date,
      message: message,
      studentID: student.id,
      teacherID: teacher.id
    }));
  }, [time, selectedLocation, date, message, student, teacher]);

  const locations = [
    { department: "Engineering", floor: 1, roomNumber: "101" },
    { department: "MCA", floor: 2, roomNumber: "202" },
    { department: "MBA", floor: 3, roomNumber: "305" },
    { department: "Management Office", floor: 1, roomNumber: "110" },
    { department: "Engineering", floor: 2, roomNumber: "215" },
  ];

  const handleSelectChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  useEffect(() => {
    setTeacher(JSON.parse(localStorage.getItem("teacher")));
  }, []);

  const handleSubmit = async () => {

    try {
      const response = await fetch(
        "http://localhost:4000/api/add-appointment",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${props.token}`
           },
          body: JSON.stringify(appointment),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        props.reload();
        props.handleCancel(false);
      } else {
        console.log("Unable to schedule!");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error: ", error);
      setLoading(false);
    }

  };

  return (
    <div className="schedule-appointment-container">
    {loading?<Loader />:null}
      <form
        className="schedule-appointment-form"
        onClick={() => setShowSearchStudent(false)}
        onSubmit={(e) => e.preventDefault()}
      >
        <section className="schedule-appointment-ribbon">
          <div>Schedule Appointment</div>
          <div>
            <IoIosClose
              className="schedule-appointment-exit-btn"
              onClick={() => {
                props.handleCancel(false);
              }}
            />
          </div>
        </section>
        <section>
          <div className="schedule-appointment-row">
            <div className="grid-container">
              <label>Teacher Email:</label>
              <span className="val">{teacher.email}</span>

              <label>Teacher Name:</label>
              <span className="val">{teacher.name}</span>

              <label>Student Email:</label> 
              <span className="val">
                <span>{student.email}</span>
                {showSearchStudent ? (
                  <StudentPicker
                    setState={(value) => setStudent(value)}
                    handleCancel={(value) => setShowSearchStudent(value)}
                    API="http://localhost:4000/api/student-details"
                  />
                ) : null}
                <CiSearch
                  className="select-student-icon"
                  onClick={(event) => {
                    event.stopPropagation();
                    setShowSearchStudent(true);
                  }}
                />
              </span>

              <label>Student Name:</label>
              <span className="val">{student.name}</span>

              <label>Date:</label>
              <span className="val">
                <Calendar setDate={setDate} />
              </span>

              <label>Time:</label>
              <span className="val">
                <TimePicker setTime={setTime} />
              </span>

              <label>Location:</label>
              <span className="val">
                <select
                  id="location-select"
                  value={selectedLocation}
                  onChange={handleSelectChange}
                >
                  <option value="" disabled>
                    Select a location
                  </option>
                  {locations.map((location, index) => (
                    <option
                      key={index}
                      value={`${location.department}, Floor: ${location.floor}, Room: ${location.roomNumber}`}
                    >
                      {`${location.department} - Floor ${location.floor}, Room ${location.roomNumber}`}
                    </option>
                  ))}
                </select>
              </span>
            </div>

            <textarea onChange={(e)=>setMessage(e.target.value)} value={message} className="message-area" placeholder="message..." />

            <div className="btn-submit-container">
              <button className="btn-submit" onClick={handleSubmit}>
                Schedule Request
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default TeacherScheduleAppointment;
