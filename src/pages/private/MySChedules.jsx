import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
// import { Helmet } from "react-helmet";


const MySchedules = () => {
    const bookedServices = useLoaderData()

    console.log(bookedServices);

    const firebaseUser = useContext(AuthContext)
    console.log(firebaseUser);


    const myBookings = bookedServices.filter(target => target.userEmail == firebaseUser.user.email);
    const myPendingWorks = bookedServices.filter(target => target.SPEmail == firebaseUser.user.email);


    return (
        <div className="min-h-screen">
            <div>
                <h2 className="md:w-[350px] mx-auto font-bold p-2 rounded-sm text-center text-xl rounded-b-xl md:text-2xl bg-orange-200 text-zinc-600  ">
                    My Bookings </h2>
            </div>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">

                {
                    myBookings.length > 0 ? myBookings?.map(service =>
                        <div key={service._id} >

                            <div className="flex flex-col h-[500px] border border-white bg-teal-400 my-6 py-3 rounded-lg">
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
                                    <Link to={`/services/${service._id}`}>
                                        <button className="bg-teal-400 hover:bg-rose-200 btn  mr-5">View Details</button>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    )
                        :
                        <div className="mt-2 min-h-screen">

                            <div>
                                <h3 className="text-2xl text-center font-bold my-10 text-red-400">No Booking available now!</h3>
                            </div>


                        </div>
                }
            </div>

            {/* my pending works  */}
            <div>
                <h2 className="md:w-[350px] mx-auto font-bold p-2 rounded-sm text-center text-xl rounded-b-xl md:text-2xl bg-orange-200 text-zinc-600  ">
                    My Pending works </h2>
            </div>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">

                {
                    myPendingWorks.length > 0 ? myPendingWorks?.map(service =>
                        <div key={service._id} >

                            <div className="flex flex-col h-[500px] border border-white bg-teal-400 my-6 py-3 rounded-lg">
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
                                    <Link to={`/services/${service._id}`}>
                                        <button className="bg-teal-400 hover:bg-rose-200 btn  mr-5">View Details</button>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    )
                        :
                        <div className="mt-2 min-h-screen">

                            <div>
                                <h3 className="text-2xl text-center font-bold my-10 text-red-400">No Pending available now!</h3>
                            </div>


                        </div>
                }

            </div>
        </div>
    )
}

export default MySchedules;













