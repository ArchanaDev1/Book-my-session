import React, { useEffect, useState } from "react";
import "./studentappointmentprofile.css";
import { IoIosClose } from "react-icons/io";

const StudentAppointmentProfile = (props) => {
  const [appointment, setAppointment] = useState(props.appointment);

  const { _id } = props.appointment;

  const approveAppointment = async (status) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/approve-appointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id, status }),
        }
      );
      if (response.status == 200) {
        const data = await response.json();
        setAppointment(data);
        props.reload();
        props.handleCancel(false)
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
      <form className="schedule-appointment-form" onSubmit={(e)=>e.preventDefault()}>
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
              <label>Teacher Email:</label>
              <span className="val">{appointment.teacherEmail}</span>

              <label>Teacher Name:</label>
              <span className="val">{appointment.teacherName}</span>

              <label>Date:</label>
              <span className="val">
                {formatDateString(appointment.appointmentDate)}
              </span>

              <label>Time:</label>
              <span className="val">
                {appointment.appointmentTime.hour}:
                {appointment.appointmentTime.minute}{" "}
                {appointment.appointmentTime.period}
              </span>
            </div>

            <textarea
              value={appointment.message}
              className="message-area"
              placeholder="message..."
              disabled={true}
            />

            {appointment.status === "pending" ? (
              <div className="btn-submit-container btn-approve-reject">
                <button
                  className="btn-submit"
                  onClick={() => approveAppointment("cancel")}
                >
                  Cancel
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </form>
    </div>
  );
};

export default StudentAppointmentProfile;
