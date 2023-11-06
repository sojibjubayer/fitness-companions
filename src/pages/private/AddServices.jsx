
import { useContext } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";


const AddServices = () => {
  const {user}=useContext(AuthContext)
  console.log(user.displayName);
  console.log(user.photoURL);


  const handleAddService = event => {
    event.preventDefault()
    const form = event.target
    const providerName = form.providerName.value;
    const providerImage = form.providerImage.value;
    const serviceName = form.serviceName.value;
    const serviceImage = form.serviceImage.value;
    const shortD = form.sd.value;
    let serviceArea = form.serviceArea.value;
    const price = form.price.value;



    const newService = { providerName,providerImage, serviceName, serviceImage, shortD, serviceArea, price }
    console.log(newService);

    // Send data to the server
    fetch('http://localhost:5000/services', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newService)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire(
            'Good job!',
            'You Successfully added a product!',
            'success'
          )
        }
      })
    // form.reset();
  }


  return (
    <div className="bg-[#6fe78d]">
      <div className=" p-2 md:w-[70%] mx-auto">
        <h2 className="text-xl md:text-2xl text-center my-3 border-b-2 font-bold">Add Your Service</h2>

        <form onSubmit={handleAddService}>
          <div className=" md:flex gap-20">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Service Provider Name</span>
              </label>
              <label className="input-group">
                <input type="text" name="providerName" defaultValue={user.displayName} className="w-full input input-bordered" required readOnly />
              </label>
            </div>
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Service Provider Image URL</span>
              </label>
              <label className="input-group">
                <input type="text" name="providerImage" defaultValue={user.photoURL} className="w-full input input-bordered" required readOnly />
              </label>
            </div>
          </div>
          {/* form price and test row  */}
          <div className=" md:flex gap-20">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Service Name </span>
              </label>
              <label className="input-group">
                <input type="text" name="serviceName" placeholder="service name" className="w-full input input-bordered" required />
              </label>
            </div>
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Service Image</span>
              </label>
              <label className="input-group">
                <input type="text" name="serviceImage" placeholder="Service Image URL" className="w-full input input-bordered" required />
              </label>
            </div>
          </div>
          <div className=" ">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Service Description</span>
              </label>
              <label className="input-group">
                <textarea type="text" name="sd" placeholder="Describe your service in short" className="w-full input input-bordered" required />
              </label>
            </div>

          </div>
          <div className=" md:flex gap-20">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Service Area </span>
              </label>
              <label className="input-group">

                <input type="text" name="serviceArea" placeholder="Service Area" className="w-full input input-bordered" required />
              </label>
            </div>
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <label className="input-group">
                <input type="text" name="price" placeholder="Price" className="w-full input input-bordered" required />
              </label>
            </div>
          </div>
          <input type="submit" value="Add Service"
            className="btn btn-ghost bg-teal-400 hover:bg-green-300 mb-10 text-yellow-950 font-bold mt-5" />
        </form>
      </div>
      <Helmet>
        <title>FC | Add Services </title>
      </Helmet>
    </div>
  );
};

export default AddServices;