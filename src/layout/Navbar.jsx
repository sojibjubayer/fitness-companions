import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import navlogo from '../../src/assets/logo.avif'






const Navbar = () => {
    const { logOut, user } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => console.log('successfully logged out'))
            .catch(error => console.log(error))
    }
    const [showServices, setShowServices] = useState(false);

    const toggleServices = () => {
        setShowServices(!showServices);
    };
    const navLinks = <>
        <li ><NavLink to='/' className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? " border-b-2 border-white " : ""
        }>Home</NavLink></li>
        <li><NavLink to='/services'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " border-b-2 border-white " : ""
            } >Services</NavLink></li>


    </>
    return (
        <div className="">


            <nav className="border-b-4  border-teal-400 px-3 flex flex-col  md:flex-row items-center justify-between">
                <div className="flex items-center">
                    <div className="hidden md:flex justify-start gap-2 items-center mr-[200px]">
                        <img src={navlogo} className="w-16 h-16 " alt="" />
                        <h2 className="text-xl font-semibold ">Fitness Companions</h2>
                    </div>

                    <ul className="flex items-center md:flex-row  gap-10 font-semibold md:text-xl ">

                        <li className="flex gap-10">{navLinks}</li>
                        <li className="flex gap-10  md:mt-0"> {
                            user && <>
                                <li onMouseEnter={toggleServices} onMouseLeave={toggleServices}><NavLink to='#'>
                                    <span className="flex items-center">Dashboard<FaAngleDown className="mt-1"></FaAngleDown></span></NavLink>
                                    {showServices && (
                                        <ul className="service-list absolute text-black  p-1  py-2">
                                            <li className="bg-emerald-400 rounded p-1 border-b-2"><Link to='/My Services '>My Services</Link></li>
                                            <li className="bg-sky-500 rounded p-1 border-b-2"><Link to='/My Schedules'>My Schedules</Link></li>
                                            <li className="bg-pink-300 rounded p-1 border-b-2"><Link to='/Add Services'>Add Services</Link></li>

                                        </ul>
                                    )}

                                </li>
                            </>
                        }</li>

                    </ul>
                </div>
                <div>

                    <div className=" flex items-center my-5 md:my-0">
                        <div className="text-teal-400 flex items-center">

                            {
                                user && <img className="w-10 h-10 rounded-full mr-1" src={user.photoURL} alt='' />

                            }
                            {
                                user && user.displayName
                            }
                        </div>

                        {
                            user ?
                                <Link to='/' onClick={handleLogOut} ><button className="btn btn-sm ml-3 bg-teal-400">Log Out</button></Link>
                                :
                                <Link to='/login'><button className="btn btn-sm ml-3">Login</button></Link>

                        }

                    </div>

                </div>
            </nav>
        </div>
    );
};

export default Navbar;


