import {
  FaUser,
  FaBuilding,
  FaRupeeSign,
  FaRegAddressCard,
} from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { MdEmail, MdMenuBook } from "react-icons/md";
import { FaMobileScreenButton } from "react-icons/fa6";
import { BsGenderFemale } from "react-icons/bs";
import { useEffect, useState } from "react";
import "./updatestudent.css";
import PasswordModal from "../passwordmodal/PasswordModal";
import { RxCross2 } from "react-icons/rx";
import Loader from "../loader/Loader";
import CustomModal from "../custommodal/CustomModal";

const UpdateStudent = ({ handleCancel, user, token }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [department, setDepartment] = useState(user.department);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [gender, setGender] = useState(user.gender);
  const [status, setStatus] = useState(user.status);
  const [id, setId] = useState(user.id);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/update-student", {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
        },
        method: "PUT",
        body: JSON.stringify({
          user,
          newData: {
            name,
            address,
            phone,
            email,
            department,
            gender,
          },
        }),
      });
      if (response.status == 200) {
        handleCancel(false);
      } else {
        console.log("Update Failed");
        handleCancel(false);
      }
    } catch (error) {
      console.log("error");
      handleCancel(false);
    }
  };
  const toggleChangePassword = (value) => {
    setShowChangePassword(value);
    handleCancel(false);
  };

  const deleteStudent = async (event) => {
    const token = JSON.parse(localStorage.getItem('admin')).token;
    console.log("My token: ", token)
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/delete-student?id=${user.id}`,
        {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
          }
        }
      );
      if (response.ok) {
        const student = await response.json();
        console.log("Student", student);
        alert("Student deleted successfully!");
        setLoading(false);
        handleCancel(false);
      } else {
        console.log("Unable to delete student");
        alert("Unable to delete student");
        setLoading(false);
        handleCancel(false);
      }
    } catch (error) {
      alert("Error in deleting student");
      alert("error in deleting student");
      setLoading(false);
      handleCancel(false);
    }
  };

  const approveRegistration = async () => {
    console.log("token: ", token)
    try {
      const response = await fetch(
        "http://localhost:4000/api/approve-student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
          },
          body: JSON.stringify({ email: user.email }),
        }
      );
      if (response.status == 200) {
        const data = await response.json();
        setResult(true);
        setShowModal(true);
      } else {
        alert("Cannot approve!");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <div className="absolute-screen">
    {showModal?<CustomModal result={result} handleCancel={(value)=>{
      setShowModal(value);
      handleCancel(false);
      }} />:null}
      {loading ? <Loader /> : null}
      {showChangePassword ? (
        <PasswordModal
          handleCancel={toggleChangePassword}
          user={user}
          API="http://localhost:4000/api/change-student-password"
          token= {token}
        />
      ) : null}
      <form className="student-update-form" onSubmit={(e)=>e.preventDefault()}>
        <div className="btn-exit-container">
          <RxCross2
            className="btn-exit"
            onClick={() => {
              handleCancel(false);
            }}
          />
        </div>

        <h1 className="h1tag">Edit Student</h1>

        <div className="student-update-form-body">
          <section className="student-update-row">
            <div className="student-item-container">
              <FaUser />
              <input
                type="text"
                placeholder="Student ID"
                value={id ? id : "#NA"}
                disabled={true}
              />
            </div>

            <div className="student-item-container">
              <FaUser />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
          </section>
          <section className="student-update-row">
            <div className="student-item-container">
              <MdEmail />
              <input
                type="Email"
                placeholder="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div className="student-item-container">
              <FaBuilding />
              <input
                type="Text"
                placeholder="Department"
                value={department}
                onChange={(event) => {
                  setDepartment(event.target.value);
                }}
              />
            </div>
          </section>
          <section className="student-update-row">
            <div className="student-item-container">
              <FaMobileScreenButton />
              <input
                type="text"
                placeholder="Phone-number"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
            </div>

            <div className="student-item-container">
              <FaRegAddressCard />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
            </div>
          </section>
          <section className="student-update-row">
            <div className="student-item-container">
              <BsGenderFemale />
              <input
                type="text"
                placeholder="Gender"
                value={gender}
                onChange={(event) => {
                  setGender(event.target.value);
                }}
              />
            </div>

            <div className="student-item-container">
              <GrStatusGood />
              <input
                type="text"
                placeholder="Gender"
                value={status}
                disabled={true}
              />
            </div>
          </section>
          <div className="pass-delete-btn-container">
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowChangePassword(true);
              }}
              className="button-style"
            >
              Change Password
            </button>
            <button className="button-style" onClick={deleteStudent}>
              Delete
            </button>
          </div>
        </div>
        {status == "pending" ? (
          <button onClick={approveRegistration} className="button-style">
            Approve Registrations
          </button>
        ) : null}
        <button onClick={onSubmit} className="button-style">
          Update
        </button>
      </form>
    </div>
  );
};
export default UpdateStudent;
