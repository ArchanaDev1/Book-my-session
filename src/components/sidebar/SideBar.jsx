import './sidebar.css'
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { useState } from 'react';
const SideBar = ({ children }) => {

    const [reload, setReload] = useState(false)

    const handleLogout = () => {
        console.log("hello");
        localStorage.removeItem("admin");
        setReload(pre=>!pre);
    }

    return (
        <div key={reload} className="main-container flex-horizontal">
            <div className='side-bar'>
                <div><h1>BookMySession</h1></div>
                <section className='link-list flex-vertical'>
                    <Link to="/admin/dashboard" className='flex-horizontal link '>
                        <div>{<FaHome />}</div>
                        <div>Dashboard</div>
                    </Link>
                    <Link to="/admin/teachers" className='flex-horizontal link'>
                        <div>{<FaChalkboardTeacher />}</div>
                        <div>Teachers</div>
                    </Link>
                    <Link to="/admin/students" className='flex-horizontal link '>
                        <div><PiStudentBold /></div>
                        <div>Students</div>
                    </Link>
                    < Link className='flex-horizontal link '>
                        <div><FiLogOut /></div>
                        <div onClick={handleLogout}>LogOut</div>
                    </Link>

                </section>
            </div>
            <main className='main-screen'>{children}</main>
        </div>
    )
}
export default SideBar;