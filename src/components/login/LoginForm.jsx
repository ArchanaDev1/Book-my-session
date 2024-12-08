import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import "./LoginForm.css";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../loader/Loader";

const LoginForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch(props.API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if(response.status==200){
      setError(false)
      const user = await response.json();
      localStorage.setItem(props.storageKey, JSON.stringify(user));
      setEmail("");
      setPassword("");
      setLoading(false)
      navigate(props.redirect);
    }
    else if(response.status==300){
      setErrorMessage("Registration is pending for approval!");
      setError(true)
      setLoading(false)
    } 
    else{
      setErrorMessage("Invalid email or password!");
      setError(true)
      setLoading(false)
    }
    
  };

  return (
    <div>
      {loading?<Loader />:null}
      <form className="form">
        <div className="login-par">
          <h1 className="Login">Signin</h1>
          {/* <p className="par">sign in by entering the information below</p> */}
          {error?<p className="error">{errorMessage}</p>:null}
        </div>
        <div className="allform">
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
          <p className="forgot">forgot password</p>
          <button onClick={onSubmit} className="form1">
            SIGN IN
          </button>
          {
            props.storageKey==="student"
            ?
            <p className="new-student"><span>New student?</span> <Link to="/register"><span>Register Now</span></Link></p>
            :
            null
          }
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
