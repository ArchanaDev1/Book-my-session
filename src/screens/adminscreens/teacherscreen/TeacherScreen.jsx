import AddTeacher from "../../../components/addteacher/AddTeacher";
import UpdateTeacher from "../../../components/upadateteacher/updateTeacher";
import { CiSearch } from "react-icons/ci";
import "./teacherscreen.css";
import { useEffect, useState } from "react";
import Loader from "../../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const TeacherScreen = () => {
  const [loading, setLoading] = useState(false);
  const [showUpdateTeacher, setShowUpdateTeacher] = useState(false);
  const [user, setUser] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [reload, setReload] = useState(false);
  const [searchTeacher, setSearchTeacher] = useState("");

  const token = localStorage.getItem('admin')?JSON.parse(localStorage.getItem('admin')).token:null;

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/admin/login");
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
  }, [reload]);

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
        console.log("Teacher", teachers)
        setTeachers([teachers.response]);
        setLoading(false);
      } else {
        setLoading(false);
        setTeachers([])
      }
    } catch (error) {
      alert("error in getting teachers");
      setLoading(false);
    }
  }

  return (
    <div className="teacherscreen" key={reload}>
      {loading ? <Loader /> : null}
      {showUpdateTeacher ? (
        <UpdateTeacher
          handleCancel={(value) => {
            setReload((pre) => !pre);
            setShowUpdateTeacher(value);
          }}
          user={user}
          token = {token}
        />
      ) : null}
      {showAddTeacher ? (
        <AddTeacher
          handleCancel={(value) => {
            setReload((pre) => !pre);
            setShowAddTeacher(value);
          }}
          token = {token}
        />
      ) : null}
      <section className="appointment-ribbon">
        <div className="appointment-search-bar">
          <input
            type="text"
            placeholder="Search teacher..."
            className="search-input-box "
            onChange={(e) => setSearchTeacher(e.target.value)}
          />
          <CiSearch className="appointment-search-icon pointer" onClick={handleSearchTeacher} />
        </div>
        <div>
          <button
            className="search-button"
            onClick={() => {
              setShowAddTeacher(true);
            }}
          >
            Add Teacher
          </button>
        </div>
      </section>

      {/* Teacher data in table format */}
      <section className="teacher-list">
        {/* <h2>Teachers</h2> */}
        <table className="teacher-table">
          <thead>
            <tr>
              <th>Teacher ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.id}</td>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.subject}</td>
                <td>{teacher.phone}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => {
                      setUser(teacher);
                      setShowUpdateTeacher(true);
                    }}
                  >
                    Edit
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

export default TeacherScreen;
