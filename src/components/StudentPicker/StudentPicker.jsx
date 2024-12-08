import React, { useState } from "react";
import "./studentpicker.css";
import { IoIosClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

const StudentPicker = (props) => {
  const [showStudent, setShowStudent] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [teacher, setTeacher] = useState({ id: "", name: "", email: "" });
  const [email, setEmail] = useState("");

  const getTeacher = async () => {
    try {
      const response = await fetch(props.API,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (response.status == 200) {
        const data = await response.json();
        setTeacher(data.response);
        setShowStudent(true);
        setShowNotFound(false);
      } else {
        setTeacher({ id: "", name: "", email: "" });
        setShowStudent(false);
        setShowNotFound(true);
        props.setState({ id: "", name: "", email: "" });
      }
    } catch (error) {
      console.log("Error: ", error);
      setTeacher({ id: "", name: "", email: "" });
      setShowStudent(false);
      setShowNotFound(true);
      props.setState({ id: "", name: "", email: "" });
    }
  };

  return (
    <div
      className="student-picker-container"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="schedule-appointment-ribbon">
        <div className="search-student-heading">Search Email</div>
        <div>
          <IoIosClose
            className="close-btn"
            onClick={() => props.handleCancel(false)}
          />
        </div>
      </div>
      <section className="search-student-input-container">
        <input
          className="search-student-input"
          type="email"
          placeholder="search here..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="search-student-icon-container">
          <CiSearch className="search-student-icon" onClick={getTeacher} />
        </div>
      </section>

      {showStudent ? (
        <section id="student-details-container">
          <div className="itemContainer">
            <div>ID </div>
            <div>{teacher.id}</div>
          </div>
          <div className="itemContainer">
            <div>Email </div>
            <div>{teacher.email}</div>
          </div>
          <div className="itemContainer">
            <div>Name</div>
            <div>{teacher.name}</div>
          </div>
          <div className="itemContainer">
            <button className="btn-select"
              onClick={() => {
                props.setState(teacher);
                props.handleCancel(false);
              }}
            >
              Select
            </button>
          </div>
        </section>
      ) : null}
      {showNotFound ? <section id="not-found">Not found</section> : null}
    </div>
  );
};

export default StudentPicker;
