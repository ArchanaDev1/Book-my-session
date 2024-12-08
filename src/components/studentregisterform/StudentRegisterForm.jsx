import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import "./studentregisterform.css";
import { Link, useNavigate } from "react-router-dom";

const StudentRegisterForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(props.API, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        department,
        phone,
        address,
        gender,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(await response.json());
    setName("");
    setEmail("");
    setDepartment("");
    setPhone("");
    setAddress("");
    setGender("");
    setPassword("");
    navigate('/login');
  };

  return (
    <form className="stu-regform">
      <div className="stu-login-par">
        <h1 className="Login">Register</h1>
        {/* <p className="par">sign up by entering the information below</p> */}
      </div>
      <div className="stu-register-form">
        <div className="fill">
          <div>
            <FaUserAlt />
          </div>
          <div>
            <input
              type="name"
              placeholder="Name"
              className="mail"
              id="Name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="fill">
          {" "}
          <div>
            {" "}
            <MdEmail />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="mail"
              id="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="fill">
          {" "}
          <div>
            <FaUserAlt />{" "}
          </div>
          <div>
            <input
              type="text"
              placeholder="Department"
              className="mail"
              id="department"
              value={department}
              onChange={(event) => {
                setDepartment(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="fill">
          {" "}
          <div>
            <FaUserAlt />{" "}
          </div>
          <div>
            <input
              type="text"
              placeholder="Phone number"
              className="mail"
              id="phone"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="fill">
          {" "}
          <div>
            <FaUserAlt />{" "}
          </div>
          <div>
            <input
              type="text"
              placeholder="Address"
              className="mail"
              id="address"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="fill">
          {" "}
          <div>
            <FaUserAlt />{" "}
          </div>
          <div>
            <input
              type="text"
              placeholder="Gender"
              className="mail"
              id="gender"
              value={gender}
              onChange={(event) => {
                setGender(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="fill">
          <div>
            <RiLockPasswordFill />
          </div>
          <div>
            {" "}
            <input
              type="password"
              placeholder="password"
              className="mail"
              id="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
        </div>

        <button onClick={onSubmit} className="form1">
          Register
        </button>
        <p className="new-student">
          <span>Already have an account?</span>
          <Link to="/login">
            <span>Sign-in</span>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default StudentRegisterForm;
