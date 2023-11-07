import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BallTriangle, Circles } from "react-loader-spinner";
import { Link } from "react-router-dom";


const Services = () => {



    const [allData, setAllData] = useState()

    const fontStyle = {
        fontFamily: 'Inter'
    }



    const [tempoData, setTempoData] = useState('')
    const [searchData, setSearchData] = useState('')
    const handleSearchClick = () => {
        setSearchData(tempoData)
        console.log(tempoData);

    }

   






    // Fetch data using tanstack query
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/services`);
            setAllData(data)
            return response.json();

        },
    });

    useEffect(() => {
        if (searchData) {

            const filterData = data.filter(singleData => singleData.serviceName.toLowerCase() == searchData.toLowerCase())

            if (filterData) {
                setAllData(filterData)
            }
        }
        else {
            setAllData(data)
        }
    }, [data, searchData])
    console.log(allData);







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
        <div>
             <div className="hero-content text-center text-neutral-content">
                <div className="w-[600px] mx-auto flex">
                    
                    <input className="border border-teal-400  p-2 w-full rounded text-black " type="text" value={tempoData}
                        onChange={(e) => setTempoData(e.target.value)}
                        placeholder="Search services...." />

                    <button style={fontStyle} onClick={handleSearchClick} className="p-2 rounded-r -ml-2 bg-indigo-300 text-white">Search</button>
                </div>
            </div>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
           

            {
                allData.map(service =>
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
                                <Link to={`/services/${service._id}`}>
                                    <button className="btn bg-teal-400 text-white ">View Details</button>
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

export default Services;