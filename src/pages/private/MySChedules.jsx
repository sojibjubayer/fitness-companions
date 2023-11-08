import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import MyScheduleStatusRow from "./MyScheduleStatusRow";
import axios from "axios";
import { Helmet } from "react-helmet";
// import { Helmet } from "react-helmet";


const MySchedules = () => {
    // const bookedServices = useLoaderData()
    const firebaseUser = useContext(AuthContext)
    const { user } = useContext(AuthContext)
    const url = `http://localhost:5000/bookedServices?email=${user?.email}`;
    const [allData, setAllData] = useState([])


    useEffect(() => {
        fetch(url, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAllData(data)
            })
    }, [url])
    
    const myBookings = allData.filter(target => target.userEmail == firebaseUser.user.email);
    const myPendingWorks = allData.filter(target => target.SPEmail == firebaseUser.user.email);
    console.log(myPendingWorks);
    const [pendingWorks, setPendingWorks] = useState(myPendingWorks)



    useEffect(() => {

        axios.get(url, { withCredentials: true })
            .then(res => {
                setPendingWorks(res.data)
            })
    }, [url])
    console.log(pendingWorks);

    const handleStatus = (id,selectedStatus) => {
        fetch(`http://localhost:5000/bookedServices/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status:selectedStatus  })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    console.log('Updated successfully');
                    const remaining = pendingWorks.filter(singleData => singleData._id !== id);
                    const updated = pendingWorks.find(singleData => singleData._id === id);
                    updated.status = 'confirm'
                    const newStatus = [updated, ...remaining];
                    setPendingWorks(newStatus);
                }
            })
    }


    return (
        <div className="">
            <div>
                <h2 className="md:w-[350px] mx-auto font-bold p-2 rounded-sm text-center text-xl rounded-b-xl md:text-2xl bg-orange-200 text-zinc-600  ">
                    My Bookings </h2>
            </div>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                

                {
                    myBookings.length > 0 ? myBookings?.map(service =>
                        <div key={service._id} >

                            <div className="flex flex-col h-[500px] border border-white bg-teal-400 my-6 py-3 px-2 rounded-lg">
                                <div className="flex space-x-4 items-center my-4 bg-teal-400">
                                    {/* provider image  */}
                                    <img alt="" src={firebaseUser.user.photoURL} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                                    <div className="">
                                        <a rel="noopener noreferrer" href="#" className="text-sm font-semibold text-white">{firebaseUser.user.displayName}</a>

                                    </div>
                                </div>
                                <div className="">
                                    {/* service image  */}
                                    <img src={service.serviceImage} alt="" className="object-cover w-full mb-4 md:h-52  " />
                                    <div className="space-y-2 ">
                                        <h2 className="mb-1 text-xl font-semibold text-center">{service.serviceName}</h2>
                                        <p className="text-sm ">{service.shortD}</p>
                                        <p><span className="bg-teal-400 text-white p-1">Price:</span> {service.price}</p>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <Link to={`/SchServices/${service._id}`}>
                                        <button className="bg-teal-400 hover:bg-rose-200 btn  mr-5">View Details</button>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    )
                        :
                        <div className="mt-2 md:ml-80">

                          
                                <div>
                                <h3 className="text-2xl font-bold my-10 text-red-400">No Booking available now!</h3>
                            </div>
                            


                        </div>
                }
            </div>

            {/* my pending works  */}
            <div>
                <h2 className="md:w-[350px] mx-auto font-bold p-2 rounded-sm text-center text-xl rounded-b-xl md:text-2xl bg-lime-500 text-zinc-600  ">
                    My Pending works </h2>
            </div>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Service Image</th>
                            <th>Service Name</th>
                            <th>User Email</th>
                            <th>Service Date</th>
                            <th>Instruction</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Change Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            pendingWorks.length > 0 ? pendingWorks?.map(service =>
                                <MyScheduleStatusRow
                                    key={service._id}
                                    service={service}
                                    handleStatus={handleStatus}
                                ></MyScheduleStatusRow>)
                                :
                                <div className="mt-2 md:ml-80">

                                    <div>
                                        <h3 className="text-2xl text-center font-bold my-10 text-red-400">No Pending available now!</h3>
                                    </div>


                                </div>
                        }
                    </tbody>
                </table>

            </div>
            <Helmet>
                <title>FC | My Schedule </title>
            </Helmet>
        </div>
    )
}

export default MySchedules;













