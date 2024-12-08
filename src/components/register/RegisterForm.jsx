import { useState } from "react";
import "./RegisterForm.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(name, email, password);

    const response = await fetch("http://localhost:4000/api/login", {
      method: "post",
      body: JSON.stringify({ name: name, email: email, password: password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(await response.json());

  };

  return (
    <div>
      <form className="regform">
        <div className="login-par">
          <h1 className="Login">WELCOME </h1>
          <p className="par">sign up by entering the information below</p>
        </div>
        <div className="register-form">
          <div className="fill">
            {" "}
            <div>
              <FaUserAlt />{" "}
            </div>
            <div>
              <input
                type="name"
                placeholder="Name"
                className="mail"
                id="Name"
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
                onChange={(event) => {
                  setEmail(event.target.value);
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
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
          </div>

          <button onClick={onSubmit} className="form1">
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
