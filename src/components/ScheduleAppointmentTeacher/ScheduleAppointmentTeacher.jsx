import React, { useEffect, useState } from "react";
import "./scheduleappointmentteacher.css";
import { IoIosClose } from "react-icons/io";
import Calendar from "../Calendar/Calendar";
import TimePicker from "../TimePicker/TimePicker";
import Loader from "../loader/Loader";

const StudentScheduleAppointment = (props) => {

  const [teacher, setTeacher] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState("");

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
    setTeacher(JSON.parse(localStorage.getItem('teacher')));
  }, []);

  const handleSubmit = async () => {
    const appointment = {};
    appointment.studentID = props.student.id;
    appointment.teacherID = teacher.id;
    appointment.appointmentDate = date;
    appointment.appointmentTime = time;
    appointment.appointmentLocation = selectedLocation;
    appointment.message = message;

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
        props.handleCancel(false);
      } else {
        console.log("Request not sent!");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error: ", error);
      setLoading(false);
    }
  };

  return (
    <div className="schedule-appointment-container">
      {loading ? <Loader /> : null}
      <form
        className="schedule-appointment-form"
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
              <span className="val">{props.student.email}</span>

              <label>Student Name:</label>
              <span className="val">{props.student.name}</span>

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

            <textarea
              className="message-area"
              placeholder="message..."
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="btn-submit-container">
              <button className="btn-submit" onClick={handleSubmit}>
                Sent Schedule Request
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default StudentScheduleAppointment;
