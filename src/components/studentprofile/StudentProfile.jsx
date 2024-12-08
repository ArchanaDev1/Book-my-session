import React, { useEffect, useState } from "react";
import "./studentprofile.css";
import { IoIosClose } from "react-icons/io";
import CustomModal from "../custommodal/CustomModal";

const StudentProfile = (props) => {
  const [student, setStudent] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(false);

  const token = localStorage.getItem('teacher')?JSON.parse(localStorage.getItem('teacher')).token:null;

  useEffect(() => {
    setStudent(props.student);
  }, []);

  const { email } = props.student;

  const approveStudent = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/approve-student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
          },
          body: JSON.stringify({ email: email }),
        }
      );
      if (response.status == 200) {
        const data = await response.json();
        setStudent(data);
        setResult(true);
        setShowModal(true);
      } else {
        alert("Cannot approve!");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="schedule-appointment-container">
      {showModal ? (
        <CustomModal result={result} handleCancel={setShowModal} />
      ) : null}
      <form
        className="schedule-appointment-form"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <section className="schedule-appointment-ribbon">
          <div>Profile Information</div>
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
              <label>Name:</label>
              <span className="val">{student.name}</span>

              <label>Email:</label>
              <span className="val">{student.email}</span>

              <label>Department:</label>
              <span className="val">{student.department}</span>

              <label>Phone:</label>
              <span className="val">{student.phone}</span>

              <label>Gender:</label>
              <span className="val">{student.gender}</span>

              <label>Verification:</label>
              <span className="val">{student.status}</span>
            </div>

            {student.status == "pending" ? (
              <div className="btn-submit-container">
                <button className="btn-submit" onClick={approveStudent}> 
                  Approve Registration 
                </button>
              </div>
            ) : null}

            <div className="btn-submit-container">
              <button
                className="btn-submit"
                onClick={() => props.setShowScheduleAppointment(true)}
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default StudentProfile;
