import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import Loader from "../../../components/loader/Loader";
import UpdateStudent from "../../../components/upadatestudent/UpdateStudent";
import AddStudent from "../../../components/addstudent/AddStudent";
import { useNavigate } from "react-router-dom";
import "./studentscreen.css";

const StudentScreen = () => {
  const [loading, setLoading] = useState(false);
  const [showUpdateStudent, setShowUpdateStudent] = useState(false);
  const [user, setUser] = useState({});
  const [students, setStudents] = useState([]);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [reload, setReload] = useState(false);
  const [searchStudent, setSearchStudent] = useState("");


  const token = localStorage.getItem('admin')?JSON.parse(localStorage.getItem('admin')).token:null;

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/admin/login");
    }
  }, [navigate]);

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
    <div className="teacherscreen" key={reload}>
      {loading ? <Loader /> : null}
      {showUpdateStudent ? (
        <UpdateStudent
          handleCancel={(value) => {
            setReload((pre) => !pre);
            setShowUpdateStudent(value);
          }}
          user={user}
          token = {token}
        />
      ) : null}
      {showAddStudent ? (
        <AddStudent
          handleCancel={(value) => {
            setReload((pre) => !pre);
            setShowAddStudent(value);
          }}
          token = {token}
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
        <div >
          <button
          className="search-button"
            onClick={() => {
              setShowAddStudent(true);
            }}
          >
            Add Student
          </button>
        </div>
      </section>

      {/* Teacher data in table format */}
      <section className="teacher-list">
        {/* <h2>Students</h2> */}
        <table className="teacher-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.email}>
                <td>{student.id?student.id:"#NA"}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.status}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => {
                      setUser(student);
                      setShowUpdateStudent(true);
                    }}
                  >
                    Edit
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

export default StudentScreen;
