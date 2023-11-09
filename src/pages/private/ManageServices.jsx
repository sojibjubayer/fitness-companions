import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";



const ManageServices = () => {
    // const getServices = useLoaderData()
    const [services, setServices] = useState([])

    const { user } = useContext(AuthContext)
    const url = `https://fitness-companions-server.vercel.app/services?email=${user?.email}`;


    useEffect(() => {
        fetch(url, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setServices(data)
            })
    }, [url])
    console.log(services);

    const firebaseUser = useContext(AuthContext)

    const handleDelete = _id => {
        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {

                    console.log('deleted');

                    fetch(`https://fitness-companions-server.vercel.app/services/${_id}`, {
                        method: 'DELETE',
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.deletedCount > 0) {
                                Swal.fire(
                                    'Deleted!',
                                    'Your service has been deleted.',
                                    'success'
                                )

                                const remaining = services.filter(fProduct => fProduct._id != _id)
                                setServices(remaining)
                            }
                        })
                }
            })
    }


    const verticalLineStyle = {
        borderLeft: '3px solid #fff',
        height: '60px',
        margin: '0 10px',
    };


    return (
        <div>

            <div className="min-h-screen">
                <div>
                    <h2 className="md:w-[300px] mx-auto font-bold p-2 rounded-sm text-center text-lg rounded-b-xl md:text-2xl bg-teal-400 text-zinc-600 mb-6 ">
                        Your Added Services </h2>
                </div>
                <div className="grid gap-5 grid-cols-1 md:grid-cols-2">

                    {
                        services.filter(target => target.pEmail == firebaseUser.user.email).map(service =>
                            <div key={service._id} >


                                <div className="flex flex-col md:h-[550px]  border-pink-300 border-y-4 bg-teal-50 mb-6 py-2  rounded-lg">
                                    <div className="flex  items-center -mt-5  bg-teal-200 rounded-t-lg">
                                        <div>
                                            <h3 style={{ fontFamily: 'cursive' }} className="text-xl ml-3">provider</h3>
                                        </div>
                                        <div>
                                            <div style={verticalLineStyle}></div>
                                        </div>
                                        {/* provider image  */}
                                        <img alt="" src={service.pImage} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                                        <div className="">
                                            <p rel="noopener noreferrer" href="#" className="text-lg font-semibold ml-3">{service.pName}</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        {/* service image  */}
                                        <img src={service.serviceImage} alt="" className="object-cover w-full mb-4 md:h-64  " />
                                        <div className="space-y-2 px-1">
                                            <h2 className="mb-1 text-xl font-semibold text-center">
                                                <span style={{ fontFamily: 'cursive' }} className="">service name: </span>{service.serviceName}</h2>
                                            <p className=" ">{service.shortD}</p>
                                            <button className="btn btn-sm flex justify-center mt-4">price: {service.price} $</button>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <Link to={`../updateService/${service._id}`}>
                                            <button className="bg-teal-400 border-2 hover:bg-green-400  btn mr-5">Update Service</button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(service._id)} className="bg-teal-400 border-2  border-red-400 hover:bg-red-500 btn ">Delete Service
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>


                <Helmet>
                    <title>FC | Manage Service </title>
                </Helmet>
            </div>


        </div>


    );
};

export default ManageServices;