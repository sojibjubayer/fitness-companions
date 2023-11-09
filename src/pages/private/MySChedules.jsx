import { useContext, useEffect, useState } from "react";
import {  useLoaderData } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import MyScheduleStatusRow from "./MyScheduleStatusRow";
import axios from "axios";
import { Helmet } from "react-helmet";



const MySchedules = () => {
    const loadedData = useLoaderData()
    const firebaseUser = useContext(AuthContext)
    const url = `https://fitness-companions-server.vercel.app/bookedServices`;
    const [allData, setAllData] = useState(loadedData)
    useEffect(() => {

        axios.get(url, { withCredentials: true })
            .then(res => {
                setAllData(res.data)
                console.log(res.data);
            })
    }, [url])

    const myBookings = allData.filter(target => target.userEmail == firebaseUser.user.email);
    const myPendingWorks = allData.filter(target => target.SPEmail == firebaseUser.user.email);
    // console.log(myPendingWorks);
    const [pendingWorks, setPendingWorks] = useState(myPendingWorks)



    useEffect(() => {

        axios.get(url, { withCredentials: true })
            .then(res => {
                setPendingWorks(res.data)
            })
    }, [url])
    console.log(allData);

    const handleStatus = (id, selectedStatus) => {
        fetch(`https://fitness-companions-server.vercel.app/bookedServices/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: selectedStatus })
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

    const verticalLineStyle = {
        borderLeft: '3px solid #fff',
        height: '60px',
        margin: '0 10px',
    };
    return (
        <div className="">
            <div>
                <h2 className="md:w-[350px] mx-auto font-bold mb-7 p-2 rounded-sm text-center text-xl rounded-b-xl md:text-2xl bg-teal-400 text-zinc-600  ">
                    My Bookings </h2>
            </div>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">


                {
                    myBookings?.length > 0 ? myBookings?.map(service =>
                        <div key={service._id} >
                            <div className="flex flex-col md:h-[400px]  border-pink-300 border-y-4 bg-teal-50 mb-6 py-2  rounded-lg">
                                <div className="flex  items-center -mt-5  bg-teal-200 rounded-t-lg">
                                    <div>
                                        <div style={verticalLineStyle}></div>
                                    </div>
                                    {/* provider image  */}
                                    <img alt="" src={firebaseUser.user.photoURL} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                                    <div className="">
                                        <p rel="noopener noreferrer" href="#" className="text-lg font-semibold ml-3">{firebaseUser.user.displayName}</p>

                                    </div>
                                </div>
                                <div className="">
                                    {/* service image  */}
                                    <img src={service.serviceImage} alt="" className="object-cover w-full mb-4 md:h-64  " />
                                    <div className="space-y-2 px-1">
                                        <h2 className="mb-1 text-xl font-semibold text-center">
                                            <span style={{ fontFamily: 'cursive' }} className="">service name: </span>{service.serviceName}</h2>
                                        <div className="flex justify-center">
                                            <button className="btn btn-sm flex justify-center mt-4">price: {service.price} $</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                        :
                        <div className="mt-2 md:ml-80">
                            <div>
                                <h3 className="text-xl font-bold my-10 text-red-400 ">No Booking available now!</h3>
                            </div>
                        </div>
                }
            </div>

            {/* my pending works  */}
            <div>
                <h2 className="md:w-[350px] mx-auto font-bold p-2 rounded-sm text-center text-xl rounded-b-xl md:text-2xl bg-teal-200 mb-4 text-zinc-600  ">
                    My Pending works </h2>
            </div>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                <table className="table">
                    <thead>
                        <tr className="text-lg font-semibold">
                            <th>Service Image</th>
                            <th className="w-full">Service Name</th>
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
                            pendingWorks?.length > 0 ? pendingWorks?.map(service =>
                                <MyScheduleStatusRow
                                    key={service._id}
                                    service={service}
                                    handleStatus={handleStatus}
                                ></MyScheduleStatusRow>)
                                :
                                <div className="mt-2 md:ml-80">

                                    <div>
                                        <h3 className="text-lg text-center font-bold my-10 text-red-400">No Pending available now!</h3>
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













