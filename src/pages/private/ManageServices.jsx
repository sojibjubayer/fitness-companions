import { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";



const ManageServices = () => {
    const getServices = useLoaderData()
    const [services, setServices] = useState(getServices)
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

                    fetch(`http://localhost:5000/services/${_id}`, {
                        method: 'DELETE',
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.deletedCount > 0) {
                                Swal.fire(
                                    'Deleted!',
                                    'Your product has been deleted.',
                                    'success'
                                )
                                // filter from cart products and set it to remaining cart product
                                const remaining = services.filter(fProduct => fProduct._id != _id)
                                setServices(remaining)
                            }
                        })
                }
            })
    }

    return (
        <div>

            <div className="min-h-screen">
                <div>
                    <h2 className="md:w-[350px] mx-auto font-bold p-2 rounded-sm text-center text-xl rounded-b-xl md:text-2xl bg-orange-200 text-zinc-600  ">
                        Your Booked Services </h2>
                </div>
                <div className="grid gap-5 grid-cols-1 md:grid-cols-2">

                    {
                        services.filter(target => target.pEmail == firebaseUser.user.email).map(service =>
                            <div key={service._id} >
                                <div className="flex flex-col h-[500px] border border-white bg-teal-400 my-6 py-3 rounded-lg">
                                    <div className="flex space-x-4 items-center my-4 bg-teal-400">
                                        {/* provider image  */}
                                        <img alt="" src={service.pImage} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                                        <div className="">
                                            <a rel="noopener noreferrer" href="#" className="text-sm font-semibold text-white">{service.pName}</a>

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
                                    <Link to={`../updateService/${service._id}`}>
                                        <button className="bg-[#FFA171] hover:bg-green-400 btn btn-sm">Update</button>
                                    </Link>
                                        <button
                                            onClick={() => handleDelete(service._id)} className="bg-amber-200 border-2  border-red-400 hover:bg-red-500 btn btn-sm mr-5">Delete from cart
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )
                    }

                </div>

                {/* <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5 py-7'>
                    {
                        services.filter(target => target.pEmail == firebaseUser.user.email).map(brand => <div key={brand._id}>
                            <div className="md:w-[350px] h-[420px] mx-auto bg-amber-200 rounded-t-xl">
                                <img className="w-full h-[230px] rounded-t-xl" src={brand.image} alt="" />
                                <h3 className=" text-center text-xl font-bold pt-2">{brand.name}</h3>
                                <h3 className="-mt-2 text-center text-base font-bold pt-2">Brand: {brand.brand}</h3>
                                <h3 className="text-center text-base font-bold pt-2">Category: {brand.type}</h3>
                                <div className="flex  justify-center">
                                    <h3 className="mr-5 text-center text-base font-bold pt-2">Price: {brand.price}$</h3>
                                    <h3 className="text-center text-base font-bold pt-2">Rating:
                                        <span className="bg-white px-1 rounded ml-1">{brand.rating}</span></h3>
                                </div>
                                <div className="flex  justify-center mt-5">

                                    <button
                                        onClick={() => handleDelete(brand._id)} className="bg-amber-200 border-2  border-red-400 hover:bg-red-500 btn btn-sm mr-5">Delete from cart
                                    </button>

                                </div>
                            </div>
                        </div>)
                    }

                </div> */}
                <Helmet>
                    <title>FC | My Services </title>
                </Helmet>
            </div>


        </div>


    );
};

export default ManageServices;