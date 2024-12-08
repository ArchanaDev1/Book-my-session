import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import StudentProfile from "../../../components/studentprofile/StudentProfile";
import StudentScheduleAppointment from "../../../components/StudentScheduleAppointment/StudentScheduleAppointment";
import TeacherScheduleAppointment from "../../../components/teacherscheduleappointment/TeacherScheduleAppointment";
import ScheduleAppointment from "../../../components/ScheduleAppointment/ScheduleAppointment";
import ScheduleAppointmentTeacher from '../../../components/ScheduleAppointmentTeacher/ScheduleAppointmentTeacher'

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";

const StudentsScreen = () => {
  const [showScheduleAppointment, setShowScheduleAppointment] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [reload, setReload] = useState(false);
  const [searchStudent, setSearchStudent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("teacher")) {
      navigate("/teacher/login");
    }
  }, []);

  const handleCancel = (value) => {
    setReload((pre) => !pre);
    setShowProfile(value);
  };

  const getStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/students");
      if (response.ok) {
        const students = await response.json();
        setStudents(students.response);
        setLoading(false);
      } else {
        alert("Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      alert("error in getting teachers");
      setLoading(false);
    }
  };
  useEffect(() => {
    getStudents();
  }, [reload]);


  const handleSearchStudent = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/student-details",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: searchStudent})
      });
      if (response.ok) {
        const students = await response.json();
        console.log("Student", students)
        setStudents([students.response]);
        setLoading(false);
      } else {
        setStudents([])
        setLoading(false);
      }
    } catch (error) {
      alert("error in getting teachers");
      setLoading(false);
    }
  }

  return (
    <div className="screen">
      {loading ? <Loader /> : null}
      {showProfile ? (
        <StudentProfile
          setShowScheduleAppointment={setShowScheduleAppointment}
          handleCancel={handleCancel}
          student={studentData}
        />
      ) : null}

      {showScheduleAppointment ? (
        <ScheduleAppointmentTeacher
          handleCancel={(value) => {
            handleCancel(false);
            setShowScheduleAppointment(value);
          }}
          student={studentData}
          reload={setReload}
          token = {JSON.parse(localStorage.getItem("teacher")).token}
        />
      ) : null}
      <section className="appointment-ribbon">
        <div className="appointment-search-bar">
          <input
            type="text"
            placeholder="Search student..."
            className="search-input-box"
            onChange={(e)=>setSearchStudent(e.target.value)}
          />
          <CiSearch className="appointment-search-icon pointer" onClick={handleSearchStudent}/>
        </div>
      </section>

      <section className="appointment-table-container">
        <table className="appointment-table">
          <thead>
            <tr>
              <td>Student ID</td>
              <td>Student Name</td>
              <td>Student Email ID</td>
              <td>Department</td>
              <td>Gender</td>
              <td>Phone</td>
              <td>Verification</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.id ? student.id : "#NA"}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td>{student.gender}</td>
                <td>{student.phone}</td>
                <td>{student.status}</td>
                <td>
                  <button
                    onClick={() => {
                      setStudentData(student);
                      setShowProfile(true);
                    }}
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length<1?(<h1 className="not-found-message">Not found!</h1>):null}
      </section>
    </div>
  );
};

export default StudentsScreen;
