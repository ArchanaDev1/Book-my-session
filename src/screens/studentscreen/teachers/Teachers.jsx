import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import TeacherProfile from "../../../components/teacherprofile/TeacherProfile";
import StudentScheduleAppointment from "../../../components/StudentScheduleAppointment/StudentScheduleAppointment";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";

const Teachers = () => {
  const [showScheduleAppointment, setShowScheduleAppointment] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [searchTeacher, setSearchTeacher] = useState("");

  const naviate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("student")) {
      naviate("/login");
    }
  }, []);

  const getTeachers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/teachers");
      if (response.ok) {
        const teachers = await response.json();
        setTeachers(teachers.response);
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
    getTeachers();
  }, []);

  const handleSearchTeacher = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/teacher-details",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: searchTeacher})
      });
      if (response.ok) {
        const teachers = await response.json();
        console.log("Student", teachers)
        setTeachers([teachers.response]);
        setLoading(false);
      } else {
        setTeachers([])
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
        <TeacherProfile
          setShowScheduleAppointment={setShowScheduleAppointment}
          handleCancel={setShowProfile}
          teacher={teacherData}
        />
      ) : null}

      {showScheduleAppointment ? (
        <StudentScheduleAppointment
          handleCancel={(value) => setShowScheduleAppointment(value)}
          data={teacherData}
          storageKey="student"
          token = {JSON.parse(localStorage.getItem("student")).token}
        />
      ) : null}
      <section className="appointment-ribbon">
        <div className="appointment-search-bar">
          <input
            type="text"
            placeholder="Search here"
            className="search-input-box"
            onChange={(e)=>setSearchTeacher(e.target.value)}
          />
          <CiSearch className="appointment-search-icon pointer" onClick={handleSearchTeacher}/>
        </div>
      </section>

      <section className="appointment-table-container">
        <table className="appointment-table teacher-table">
          <thead>
            <tr>
              <td>Teacher Name</td>
              <td>Teacher Email ID</td>
              <td>Department</td>
              <td>Subject</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.department}</td>
                <td>{teacher.subject}</td>
                <td>
                  <button
                    onClick={() => {
                      setTeacherData(teacher);
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
        {teachers.length<1?(<h1 className="not-found-message">Not found!</h1>):null}
      </section>
    </div>
  );
};

export default Teachers;
