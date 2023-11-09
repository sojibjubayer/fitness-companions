import { useContext } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
// import toast from "react-hot-toast";


const ServiceDetails = () => {

  // const params = useParams()
  const params = useParams()
  const services = useLoaderData()
  // console.log(params);
  // console.log(services);

  const { user } = useContext(AuthContext)
  console.log(user);

  // const [successData,setSuccessData]=useState('')


  const handleAddBooking = event => {
    event.preventDefault()
    const form = event.target
    const serviceName = form.serviceName.value;
    const serviceImage = form.serviceImage.value;
    const SPEmail = form.SPEmail.value;
    const userEmail = form.userEmail.value;
    const date = form.date.value;
    const specialInstruction = form.specialInstruction.value;
    const price = form.price.value;
    const bookedService = { serviceName, serviceImage, SPEmail, userEmail, date, specialInstruction, price }
    console.log(bookedService);

    // Send data to the server
    fetch('https://fitness-companions-server.vercel.app/bookedServices', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(bookedService)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire(
            'Good job!',
            'You Successfully booked a service!',
            'success'
          )
        }



      })

  }
  const targetService = services.find(service => service._id === params.id);
  const providerEmail = targetService ? targetService.pEmail : null;
  const verticalLineStyle = {
    borderLeft: '3px solid #F2F2F2',
    height: '60px',
    margin: '0 10px',
  };
  return (
    <div className="">
      <div className='grid grid-cols-1  py-7'>
        {
          services.filter(target => target._id == params.id).map(service =>
            <div key={service._id} >
              <div className="flex flex-col w-[] border border-white bg-teal-100 my-6 p-3 rounded-lg">
                <div className="md:flex md:flex-row flex-col gap-10">
                  <div className="md:w-1/3">
                    <img className="w-full md:w-[450px] h-[250px] md:h-[330px] rounded-r-xl" src={service.serviceImage} alt="" />
                  </div>
                  <div className="p-2 md:w-2/3">
                    <div className="flex  items-center -mt-5">
                      <div>
                        <h3 style={{ fontFamily: 'cursive' }} className="text-xl ml-3">provider</h3>
                      </div>
                      <div>
                        <div style={verticalLineStyle}></div>
                      </div>
                      {/* provider image  */}
                      <img alt="" src={service.pImage} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                      <div className="ml-6">
                        <p rel="noopener noreferrer" href="#" className="text-lg font-semibold ml-3">{service.pName}</p>
                        <h3 className="  text-base font-bold pt-2">Location: {service.serviceArea}</h3>
                      </div>
                    </div>
                    <h2 className="mb-1 text-xl font-semibold  mt-10">
                      <span style={{ fontFamily: 'cursive' }} className="">service name: </span>{service.serviceName}</h2>
                    <div className="flex">
                      <p className="mt-2"> <span className="font-bold">Details:</span> <span className=""> {service.shortD}</span></p>
                    </div>
                    <div className="flex  ">
                      <h3 className="mr-5  text-base font-bold mt-1"><span className="font-bold">Price:</span> {service.price}$</h3>
                    </div>

                  </div>
                </div>


                <div className="flex justify-center">

                  {/* Modal*/}
                  <button className="bg-teal-400 hover:bg-white hover:text-teal-400 btn" onClick={() => document.getElementById('my_modal').showModal()}>Book Now</button>
                  <dialog id="my_modal" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>


                      <div className="bg-teal-400">
                        <div className=" p-2 md:w-[70%] mx-auto">
                          <h2 className="text-xl md:text-2xl text-center my-3 border-b-2 font-bold">Purchase This Service</h2>

                          <form onSubmit={handleAddBooking}>

                            <div className="form-control ">
                              <label className="label">
                                <span className="label-text">Service Name</span>
                              </label>
                              <label className="input-group">
                                <input type="text" name="serviceName" defaultValue={service.serviceName} className="w-full input input-bordered" required readOnly />
                              </label>
                            </div>
                            <div className="form-control ">
                              <label className="label">
                                <span className="label-text">Service Image</span>
                              </label>
                              <label className="input-group">
                                <input type="text" name="serviceImage" defaultValue={service.serviceImage} className="w-full input input-bordered" required readOnly />
                              </label>
                            </div>

                            {/* form price and test row  */}

                            <div className="form-control ">
                              <label className="label">
                                <span className="label-text">Service Provider Email </span>
                              </label>
                              <label className="input-group">
                                <input type="text" name="SPEmail" defaultValue={service.pEmail} className="w-full input input-bordered" required readOnly />
                              </label>
                            </div>
                            <div className="form-control ">
                              <label className="label">
                                <span className="label-text">Your Email </span>
                              </label>
                              <label className="input-group">
                                <input type="text" name="userEmail" defaultValue={user.email} className="w-full input input-bordered" required readOnly />
                              </label>
                            </div>
                            <div className="form-control ">
                              <label className="label">
                                <span className="label-text">Service Taking Date</span>
                              </label>
                              <label className="input-group">
                                <input type="date" name="date" className="w-full input input-bordered" required />
                              </label>
                            </div>
                            <div className="form-control ">
                              <label className="label">
                                <span className="label-text">Sprcial Instruction</span>
                              </label>
                              <label className="input-group">
                                <input type="text" name="specialInstruction" placeholder="address , area,  service plan" className="w-full input input-bordered" required />
                              </label>
                            </div>
                            <div className="form-control ">
                              <label className="label">
                                <span className="label-text">Price</span>
                              </label>
                              <label className="input-group">
                                <input type="text" name="price" defaultValue={service.price} className="w-full input input-bordered" required readOnly />
                              </label>
                            </div>

                            <button
                              className="btn bg-teal-400 mt-5">
                              <input type="submit" value="Purchase Now"
                                className="  font-semibold " />
                            </button>
                          </form>
                        </div>

                      </div>
                    </div>
                  </dialog>

                </div>

              </div>
            </div>
          )
        }

      </div>


      {/* Other services by the same provider  */}
      <div>
        <h2 className="md:w-[350px] mx-auto font-bold p-2 rounded-sm text-center text-xl rounded-b-xl md:text-xl bg-teal-400 text-zinc-600 my-4 ">
          Other Services by Same Provider </h2>
      </div>


      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        {
          services?.filter(target => target.pEmail == providerEmail).map(service =>
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
                  <Link to={`/services/${service._id}`}>
                    <button className="bg-pink-300 hover:bg-rose-200 rounded-lg p-2 w-[200px] mt-2 md:mt-11 ">View Details</button>
                  </Link>
                </div>

              </div>
            </div>
          )
        }
      </div>


    </div>
  );
};

export default ServiceDetails;