

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Circles } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Services = () => {
    const [tempoData, setTempoData] = useState('');
    const [searchData, setSearchData] = useState('');

    const handleSearchClick = () => {
        setSearchData(tempoData);
        console.log(tempoData);
    };

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const response = await fetch(`https://fitness-companions-server.vercel.app/services`, { credentials: 'include' });
            return response.json();
        },
    });

    if (isLoading || isFetching) {
        return (
            <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        );
    }

    const verticalLineStyle = {
        borderLeft: '3px solid #fff',
        height: '60px',
        margin: '0 10px',
    };

    return (
        <div>
            <div className="hero-content text-center text-neutral-content">
                <div className="w-[600px] mx-auto flex">
                    <input
                        className="border border-teal-400  p-2 w-full rounded text-black "
                        type="text"
                        value={tempoData}
                        onChange={(e) => setTempoData(e.target.value)}
                        placeholder="Search services...."
                    />
                    <button onClick={handleSearchClick} className="p-2 rounded-r -ml-2 bg-indigo-300 text-white">
                        Search
                    </button>
                </div>
            </div>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                {data?.filter((singleData) => !searchData || singleData.serviceName.toLowerCase().includes(searchData.toLowerCase()))
                    .map((service) => (
                        <div key={service._id}>
                            <div className="flex flex-col md:h-[550px] border-pink-300 border-y-4 bg-teal-50 mb-6 py-2 rounded-lg">
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
                    ))}
            </div>

            <Helmet>
                <title>FC | Services </title>
            </Helmet>
        </div>
    );
};

export default Services;
