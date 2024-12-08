import React from 'react'
import "./teacherprofile.css";
import { IoIosClose } from "react-icons/io";

const TeacherProfile = (props) => {
  console.log(props.teacher)
  return (
    <div className="schedule-appointment-container">
      <form
        className="schedule-appointment-form"
        onClick={(e) => {
            e.stopPropagation()
            e.preventDefault();
        }}
      >
        <section className="schedule-appointment-ribbon">
          <div>Profile Information</div>
          <div>
            <IoIosClose
              className="schedule-appointment-exit-btn"
              onClick={() => {
                props.handleCancel(false)
              }}
            />
          </div>
        </section>
        <section>
          <div className="schedule-appointment-row">
            <div className="grid-container">
              <label>Name:</label>
              <span className="val">{props.teacher.name}</span>

              <label>Email:</label>
              <span className="val">{props.teacher.email}</span>

              <label>Department:</label>
              <span className="val">
                {props.teacher.department}
              </span>

              <label>Subject:</label>
              <span className="val">{props.teacher.subject}</span>

              <label>Phone:</label>
              <span className="val">
                {props.teacher.phone}
              </span>

              <label>Gender:</label>
              <span className="val">
                {props.teacher.gender}
              </span>
            
            </div>
           
            <div className="btn-submit-container">
              <button className="btn-submit" onClick={()=>props.setShowScheduleAppointment(true)}>Schedule Appointment</button>
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}

export default TeacherProfile
