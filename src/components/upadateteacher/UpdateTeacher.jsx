import {
  FaUser,
  FaBuilding,
  FaRupeeSign,
  FaRegAddressCard,
} from "react-icons/fa";
import { MdEmail, MdMenuBook } from "react-icons/md";
import { FaMobileScreenButton } from "react-icons/fa6";
import { BsGenderFemale } from "react-icons/bs";
import { useState } from "react";
import "./updateteacher.css";
import PasswordModal from "../passwordmodal/PasswordModal";
import { RxCross2 } from "react-icons/rx";
import Loader from "../loader/Loader";

const UpdateTeacher = ({ handleCancel, user, token }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [department, setDepartment] = useState(user.department);
  const [subject, setSubject] = useState(user.subject);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [gender, setGender] = useState(user.gender);
  const [salary, setSalary] = useState(user.salary);
  const [loading, setLoading] = useState(false);

  // const token = JSON.parse(localStorage.getItem("admin")).token;

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/update-teacher", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
            salary,
            subject,
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

  const deleteTeacher = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/delete-teacher?id=${user.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
          },
        }
      );
      if (response.ok) {
        const teacher = await response.json();
        console.log("Teacher", teacher);
        alert("Teacher deleted successfully!");
        setLoading(false);
        handleCancel(false);
      } else {
        console.log("Unable to delete teacher");
        alert("Unable to delete teacher");
        setLoading(false);
        handleCancel(false);
      }
    } catch (error) {
      alert("Error in deleting teacher");
      alert("error in deleting teacher");
      setLoading(false);
      handleCancel(false);
    }
  };

  return (
    <div className="first-div">
      {loading ? <Loader /> : null}
      {showChangePassword ? (
        <PasswordModal
          handleCancel={toggleChangePassword}
          user={user}
          API="http://localhost:4000/api/change-teacher-password"
          token = {token}
        />
      ) : null}
      <form className="teacher-form">
        <div className="pass-btn-exit">
          {" "}
          <RxCross2
            className="btn-exit"
            onClick={() => {
              handleCancel(false);
            }}
          />
        </div>
        <h1 className="h1tag">Edit Teacher</h1>
        <div className="Allinput">
          <div className="input-container">
            <div className="fill item">
              <div>
                <FaUser />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="mail"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="fill item">
              <div>
                <MdEmail />
              </div>
              <div>
                <input
                  type="Email"
                  placeholder="Email"
                  className="mail"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="fill item">
              <div>
                <FaBuilding />
              </div>
              <div>
                <input
                  type="Text"
                  placeholder="Department"
                  className="mail"
                  value={department}
                  onChange={(event) => {
                    setDepartment(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="fill item">
              <div>
                <MdMenuBook />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="mail"
                  value={subject}
                  onChange={(event) => {
                    setSubject(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="fill item">
              <div>
                <FaRupeeSign />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Salary"
                  className="mail"
                  value={salary}
                  onChange={(event) => {
                    setSalary(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="fill item">
              <div>
                <FaMobileScreenButton />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Phone-number"
                  className="mail"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="fill item">
              <div>
                <FaRegAddressCard />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Address"
                  className="mail"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="fill item">
              <div>
                <BsGenderFemale />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Gender"
                  className="mail"
                  value={gender}
                  onChange={(event) => {
                    setGender(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="fill item updateteacher-btn-container">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowChangePassword(true);
                }}
                className="button-style"
              >
                Change Password
              </button>
              <button className="button-style" onClick={deleteTeacher}>
                Delete
              </button>
            </div>
          </div>
        </div>
        <button onClick={onSubmit} className="button-style">
          Update
        </button>
      </form>
    </div>
  );
};
export default UpdateTeacher;
