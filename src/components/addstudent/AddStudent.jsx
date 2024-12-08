import { FaUser, FaBuilding, FaRegAddressCard } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaMobileScreenButton } from "react-icons/fa6";
import { BsGenderFemale } from "react-icons/bs";
import { useState } from "react";
import "./addstudent.css";
import { RxCross2 } from "react-icons/rx";
import Loader from "../loader/Loader";
import { GrSecure } from "react-icons/gr";

const AddStudent = ({ handleCancel }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(" http://localhost:4000/api/add-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          department,
          phone,
          address,
          gender,
        }),
      });
      if (response.status == 200) {
        const data = await response.json();
        console.log("Student added", data);
        setName("");
        setEmail("");
        setDepartment("");
        setPhone("");
        setAddress("");
        setGender("");
        setPassword("");
        setLoading(false);
        handleCancel(false);
      } else {
        console.log("error in adding student");
        setLoading(false);
      }
    } catch (error) {
      console.log("error");
      setLoading(false);
    }
  };

  return (
    <div className="absolute-screen">
      {loading ? <Loader /> : null}

      <form className="student-update-form">
        <div className="btn-exit-container">
          <RxCross2
            className="btn-exit"
            onClick={() => {
              handleCancel(false);
            }}
          />
        </div>

        <h1 className="h1tag">Add Student</h1>

        <div className="student-update-form-body">
          <section className="student-update-row">
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
          </section>
          <section className="student-update-row">
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
          </section>
          <section className="student-update-row">
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
          </section>
          <section className="student-update-row">
            <div className="student-item-container">
              <GrSecure />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
          </section>
        </div>

        <button onClick={onSubmit} className="button-style add-student-button">
          Add Student
        </button>
      </form>
    </div>
  );
};
export default AddStudent;
