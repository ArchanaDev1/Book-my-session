import { FaAddressBook, FaUser, FaBuilding, FaRupeeSign, FaRegAddressCard } from "react-icons/fa";
import { MdEmail, MdMenuBook } from "react-icons/md";
import { FaMobileScreenButton } from "react-icons/fa6";
import { BsGenderFemale } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import "./addteacher.css"
import { RxCross2 } from "react-icons/rx";
import Loader from "../loader/Loader";

const AddTeacher = ({ handleCancel, token }) => {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [department, setDepartment] = useState("")
    const [subject, setSubject] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState("")
    const [password, setPassword] = useState("")
    const [salary, setSalary] = useState("")

    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault()
        // console.log(email, password, name, id, department, subject, phone, address, gender, salary)
        try {
            setLoading(true);
            const response = await fetch(" http://localhost:4000/api/add-teacher", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ email, password, name, id, department, subject, phone, address, gender, salary })
            })
          if(response.status==200){
            const data = await response.json()
            console.log("teacher added",data)
            setId("");
            setName("");
            setEmail("");
            setDepartment("");
            setSubject("");
            setPhone("")
            setAddress("")
            setGender("");
            setPassword("");
            setSalary(null);
            setLoading(false)
            handleCancel(false)
          }
          else{
            console.log("error in adding teacher")
            setLoading(false)
          }
        }
        catch (error) {
            console.log("error")
            setLoading(false)
        }
    }

    return (<div className="first-div" >
    {loading?<Loader />:null}
        <form className="teacher-form">
            <div className="pass-btn-exit"> <RxCross2 className="btn-exit" onClick={() => { handleCancel(false) }} /></div>
            <h1 className="h1tag">Add Teacher</h1>
            <div className="Allinput">
                <div className="input-container">
                    {/* <div className="fill item">
                        <div><FaAddressBook /></div>
                        <div>
                            <input type="text" placeholder="Teacher-ID" className="mail" onChange={(event) => { setId(event.target.value) }} />
                        </div>
                    </div> */}
                    <div className="fill item">
                        <div><FaUser /></div>
                        <div>
                            <input type="text" placeholder="Name" className="mail" onChange={(event) => { setName(event.target.value) }} />
                        </div>
                    </div>
                    <div className="fill item">
                        <div><MdEmail /></div>
                        <div>
                            <input type="Email" placeholder="Email" className="mail" onChange={(event) => { setEmail(event.target.value) }} />
                        </div>
                    </div>
                    <div className="fill item">
                        <div><FaBuilding /></div>
                        <div>
                            <input type="Text" placeholder="Department" className="mail" onChange={(event) => { setDepartment(event.target.value) }} />
                        </div>
                    </div>
                    <div className="fill item">
                        <div><MdMenuBook /></div>
                        <div>
                            <input type="text" placeholder="Subject" className="mail" onChange={(event) => { setSubject(event.target.value) }} />
                        </div>
                    </div>
                    <div className="fill item">
                        <div>< FaRupeeSign /></div>
                        <div>
                            <input type="number" placeholder="Salary" className="mail" onChange={(event) => { setSalary(event.target.value) }} />
                        </div>
                    </div>
                    <div className="fill item">
                        <div><FaMobileScreenButton /></div>
                        <div>
                            <input type="text" placeholder="Phone-number" className="mail" onChange={(event) => { setPhone(event.target.value) }} />
                        </div>
                    </div>
                    <div className="fill item">
                        <div><FaRegAddressCard /></div>
                        <div>
                            <input type="text" placeholder="Address" className="mail" onChange={(event) => { setAddress(event.target.value) }} />
                        </div>
                    </div>
                    <div className="fill item">
                        <div><BsGenderFemale /></div>
                        <div>
                            <input type="text" placeholder="Gender" className="mail" onChange={(event) => { setGender(event.target.value) }} />
                        </div>
                    </div>
                    <div className="fill item">
                        <div><RiLockPasswordFill /></div>
                        <div>
                            <input type="password" placeholder="password" className="mail" onChange={(event) => { setPassword(event.target.value) }} />
                        </div>
                    </div>
                </div>

            </div>
            <button onClick={onSubmit} className="button-style">Add Teacher</button>
        </form>
    </div>)
}
export default AddTeacher;