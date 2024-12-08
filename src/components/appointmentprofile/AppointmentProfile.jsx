import React, { useEffect, useState } from "react";
import "./appointmentprofile.css";
import { IoIosClose } from "react-icons/io";

const AppointmentProfile = (props) => {
  const [appointment, setAppointment] = useState({});

  useEffect(() => {
    setAppointment(props.appointment);
  }, []);
  console.log(props);
  const { _id } = props.appointment;

  const approveAppointment = async (status) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/approve-appointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${props.token}`
          },
          body: JSON.stringify({ _id, status }),
        }
      );
      if (response.status == 200) {
        const data = await response.json();
        setAppointment(data);
      } else {
        alert("Cannot approve!");
      }
    } catch (error) {
      console.log("Error: ", error);
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

  return (
    <div className="schedule-appointment-container">
      <form
        className="schedule-appointment-form"
        onClick={() => setShowSearchStudent(false)}
      >
        <section className="schedule-appointment-ribbon">
          <div>Appointment Details</div>
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
              <label>Student Email:</label>
              <span className="val">{appointment.studentEmail}</span>

              <label>Student Name:</label>
              <span className="val">{appointment.studentName}</span>

              <label>Date:</label>
              <span className="val">
                {formatDateString(appointment.appointmentDate)}
              </span>

              <label>Time:</label>
              <span className="val">05:20 PM</span>
            </div>

            <textarea
              value={appointment.message}
              className="message-area"
              placeholder="message..."
            />

            <div className="btn-submit-container btn-approve-reject">
              <button
                className="btn-submit"
                onClick={() => approveAppointment("approved")}
              >
                Approve
              </button>
              <button
                className="btn-submit"
                onClick={() => approveAppointment("rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AppointmentProfile;
