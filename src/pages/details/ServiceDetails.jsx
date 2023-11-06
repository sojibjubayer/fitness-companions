import { useContext } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";


const ServiceDetails = () => {
   
    // const params = useParams()
    const params= useParams()
    const services = useLoaderData()
    console.log(params);
    console.log(services);
  
    const firebaseUser = useContext(AuthContext)
    console.log(firebaseUser);
  
  
    const handleAddtoBooked = getservice => {
      const { name, type, price, rating, service, image } = getservice
      const cartservice = { name, type, price, rating, service, image }
      cartservice.email = firebaseUser.user.email
      console.log(service);
      fetch('http://localhost:5000/bookedServices', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(cartservice)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.insertedId) {
            Swal.fire(
              'Good job!',
              'Product Added Successfully to cart!',
              'success'
            )
          }
        })
    }

    return (
        <div className="">
      <div className='grid grid-cols-1  py-7'>
      {
          services.filter(target => target._id == params.id).map(service =>
            <div key={service._id} >
              <div className="flex flex-col w-[] border border-white bg-teal-400 my-6 p-3 rounded-lg">
                <div className="flex space-x-4 items-center my-4 bg-teal-400">
                  {/* provider image  */}
                  <img alt="" src={service.providerImage} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                  <div className="">
                    <p rel="noopener noreferrer" href="#" className="text-sm font-semibold text-white">{service.providerName}</p>
                    <p className="text-sm font-semibold text-white">Location: {service.serviceArea}</p>

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
                    <button onClick={handleAddtoBooked} className="bg-teal-400 hover:bg-white hover:text-teal-400 btn btn-sm mr-5">Book Now</button>
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