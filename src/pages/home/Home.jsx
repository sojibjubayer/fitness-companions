import { BallTriangle, Circles } from "react-loader-spinner";
import ImageSlider from "../ImageSlider";
import TypeWriter from "../TypeWriter";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Accordion from "../Accordion";
import AboutUs from "../AboutUs";
import ContactUs from "../ContactUs";



const Home = () => {
  // Fetch data using tanstack query
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/services`);
      return response.json();

    },
  });
  if (isLoading) {
    return <Circles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  }
  if (isFetching) {
    return <BallTriangle
      height={100}
      width={100}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperClass={{}}
      wrapperStyle=""
      visible={true}
    />
  }
  console.log(data);
  return (
    <div className="min-h-screen ">
      <ImageSlider></ImageSlider>
      <TypeWriter></TypeWriter>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">

        {
          data?.slice(0, 4).map(service =>
            <div key={service._id} >
              <div className="flex flex-col md:h-[550px] border border-white bg-teal-400 my-6 py-2 px-1 rounded-lg">
                <div className="flex space-x-4 items-center my-4 bg-teal-400">
                  {/* provider image  */}
                  <img alt="" src={service.pImage} className="object-cover w-12 h-14 rounded-full shadow dark:bg-gray-500" />
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
                  <Link to={`/services/${service._id}`}>
                    <button className="bg-teal-400 hover:bg-rose-200 btn md:btn mt-1 btn-sm  mr-5">View Details</button>
                  </Link>
                </div>

              </div>
            </div>
          )
        }

      </div>

      <div className="flex justify-center my-6">
        <Link to='/services'>
          <button className="btn bg-teal-400 text-white hover:bg-green-500">Show All</button>
        </Link>
      </div>
      <Accordion></Accordion>
      <AboutUs></AboutUs>
      <ContactUs></ContactUs>

    </div>
  );
};

export default Home;
