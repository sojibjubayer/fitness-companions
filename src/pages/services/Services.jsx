import { useQuery } from "@tanstack/react-query";
import { BallTriangle, Circles } from "react-loader-spinner";
import { Link } from "react-router-dom";


const Services = () => {
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
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">

            {
                data.map(service =>
                    <div key={service._id} >
                        <div className="flex flex-col w-[] border border-white bg-teal-400 my-6 p-3 rounded-lg">
                            <div className="flex space-x-4 items-center my-4 bg-teal-400">
                                {/* provider image  */}
                                <img alt="" src={service.providerImage} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                                <div className="">
                                    <a rel="noopener noreferrer" href="#" className="text-sm font-semibold text-white">{service.providerName}</a>

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
                                    <button className="btn bg-teal-400 text-white ">View Details</button>
                                </Link>
                            </div>

                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default Services;