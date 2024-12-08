import "./passwordmodal.css"
import { RxCross2 } from "react-icons/rx";
import { useState } from "react"
import Loader from "../loader/Loader";

const PasswordModal = ({handleCancel, user, API, token}) => {
    const [password,setPassword]=useState("") 
    const [loading, setLoading] = useState(false);


    const onSubmit= async () => {
        try {
            setLoading(true);
            const response = await fetch(API,{
              method: "PUT",
              headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
              },
              body: JSON.stringify({email: user.email, newPassword: password})
            });
            if (response.ok) {
              const students = await response.json();
              alert("Password changed successfully!")
              setLoading(false);
              handleCancel(false);
            } else {
              console.log("Unable to change password")
              alert("Unable to change password")
              setLoading(false);
              handleCancel(false);
            }
          } catch (error) {
            alert("error in changing password");
            alert("error in changing password")
            setLoading(false);
            handleCancel(false);
          }
    }

    return (
        <div className="main-modal">
        {loading?<Loader/> : null}
            <div className="modal">
                <div className="pass-btn-exit">
                    <span onClick={()=>{handleCancel(false)}}> <RxCross2 /></span>

                </div>
                <div className="pass-container">
                    <label>New Password:</label>
                    <input type="password" value={password} placeholder="New Password" className="mail" onChange={(event)=>{setPassword(event.target.value) }}/>
                </div>
                <div className="pass-btn-container">
                    <button onClick={onSubmit}  className="button-style">Submit</button>

                </div>
            </div>
        </div>
    )
}
export default PasswordModal;