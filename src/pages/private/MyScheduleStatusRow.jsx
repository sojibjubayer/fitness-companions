
import PropTypes from 'prop-types';
import { useState } from 'react';

const MyScheduleStatusRow = ({ service, handleStatus }) => {
    const { _id, serviceImage, serviceName, userEmail, date, specialInstruction, price, status } = service;
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        console.log(selectedValue);
        handleStatus(_id, selectedValue)
        window.location.reload();
    };
   
    return (


        < tr >

            <td>
                <div className="avatar">
                    <div className="rounded w-24 h-24">
                        {serviceImage && <img src={serviceImage} />}
                    </div>
                </div>
            </td>
            <td>
                {serviceName}
            </td>
            <td>
                {userEmail}
            </td>

            <td>
                {date}
            </td>
            <td>
                {specialInstruction}
            </td>
            <td>
                {price}
            </td>
            <td>
                {
                    status === 'completed' ? (
                        <span className="text-blue-500">Completed</span>
                    ) : status === 'inProgress' ? (
                        <span className="text-yellow-500">In Progress</span>
                    ) :
                    <span className="text-red-500">Pending</span>


                }

            </td>
            <td>
            
                        <select  id="statusDropdown" onChange={handleSelectChange} value={selectedOption}>
                            {/* <option value=""  >Select Option</option> */}
                            <option value="pending"  >Pending</option>
                            <option value="inProgress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    
            </td>
            

        </tr >


    );
};
MyScheduleStatusRow.propTypes = {
    service: PropTypes.object,
    handleStatus: PropTypes.func,
};


export default MyScheduleStatusRow;