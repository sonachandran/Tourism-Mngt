import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../Url';

const Viewdetailss = () => {
    const [dayDetails, setDayDetails] = useState(null);

    useEffect(() => {
        const fetchDayDetails = async () => {
            try {
                const response = await axios.get(`${baseUrl}/viewdaydetails`);
                setDayDetails(response.data);
            } catch (error) {
                console.error('Error fetching day details:', error);
            }
        };

        fetchDayDetails();
    }, []);

    return (
        <div className=''>
        <h3 className='flex heading mt-4'>Food & Accommodations</h3>
        {dayDetails ? (
            <div className="row" style={{marginLeft:'300px',marginTop:'100px'}}>
                <div className="col-md-6">
                    <h4>Our Services</h4>
                    <ul>
                        {dayDetails[0].activities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    <h4>Food Options:</h4>
                    <ul>
                        {dayDetails[0].foodOptions.map((option, index) => (
                            <li key={index}>{option}</li>
                        ))}
                    </ul>
                </div>
            </div>
        ) : (
            <p>Loading day details...</p>
        )}
    </div>
            
       
    );
};

export default Viewdetailss;

