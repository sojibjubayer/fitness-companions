import { BallTriangle, Circles } from "react-loader-spinner";
import ImageSlider from "../ImageSlider";
import TypeWriter from "../TypeWriter";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Accordion from "../Accordion";
import AboutUs from "../AboutUs";
import ContactUs from "../ContactUs";
import { Helmet } from "react-helmet";



const Home = () => {
  // Fetch data using tanstack query
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await fetch(`https://fitness-companions-server.vercel.app/services`);
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
  const verticalLineStyle = {
    borderLeft: '3px solid #fff',
    height: '60px', 
    margin: '0 10px', 
  };
  console.log(data);
  return (
    <div className="min-h-screen ">
      <ImageSlider></ImageSlider>
      <div className="my-4">
        <TypeWriter></TypeWriter>
      </div>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 ">

        {
          data?.slice(0, 4).map(service =>
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

      <div className="flex justify-center my-6">
        <Link to='/services'>
          <button className="btn bg-pink-400 text-white rounded-lg hover:bg-teal-400 mt-12">Show All</button>
        </Link>
      </div>
      <Accordion></Accordion>
      <AboutUs></AboutUs>
      <ContactUs></ContactUs>

      <Helmet>
        <title>FC | Home </title>
      </Helmet>

    </div>
  );
};

export default Home;
