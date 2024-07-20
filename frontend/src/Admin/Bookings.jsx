// import React, { useEffect, useState } from 'react'
// import Viewbooking from '../Agency/Viewbooking'
// import axios from 'axios'

// const Bookings = () => {
//     const[data,setdata]=useState('')
//     useEffect(()=>{
//         const Viewbooking=async()=>{
//             let response=await axios.get(`http://localhost:7000/viewbookingdata`)
//             setdata(response.data)
//         }
//         Viewbooking()
//     },[])
//   return (
           
// <>
//   {data && (
//     <div >
//       <h3 className='flex heading mt-4 mb-5'>CustomerBookings </h3>
     
//       <table className="table">
//         <thead>
//           <tr >
//             <th scope="col">Destination</th>
//             <th scope="col">HowMany</th>
//             <th scope="col">ArrivalDate</th>
//             <th scope="col">LeavingDate</th>
//             <th scope="col">Dob</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index}>
//               <td>{item.destination}</td>
//               <td>{item.howmany}</td>
//               <td>{item.arrivals}</td>
//               <td>{item.leaving}</td>
//               <td>{item.dob}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
    
//     </div>
//   )}
// </>


    
    
//   )
// }

// export default Bookings



import React, { useState, useEffect } from 'react';
import { FaArrowRight } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from '../Url';

const Bookings = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Display 10 bookings per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/viewbookingdata`, {
          params: {
            page: currentPage,
            limit: itemsPerPage
          }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage]);

  // const totalPages = Math.ceil(data.length / itemsPerPage);

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  return (
    <div className='ms-5 me-4'>
      <div>
        <h3 className='flex heading mt-4 mb-5'>CustomerBookings</h3>
        <table className="table ms-5 me-3">
          <thead>
            <tr>
              <th scope="col">Destination</th>
              <th scope="col">How Many</th>
              <th scope="col">Arrival Date</th>
              <th scope="col">Leaving Date</th>
              <th scope="col">Accommodation</th>
              <th scope="col">Transportation</th>

            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.destination}</td>
                <td>{item.howmany}</td>
                <td>{item.arrivals}</td>
                <td>{item.leaving}</td>
                <td>{item.accommodation}</td>
                <td>{item.transportation}</td>

              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {/* {totalPages > 1 && (
            <ul className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          )} */}
        </div>
        {/* Link to navigate to Viewbookings2 */}
        <Link to="/admin/bookings2" className='mb-5 ms-5'><FaArrowRight style={{fontSize:'25px' }}/>Next</Link>
      </div>
    </div>
  );
};

export default Bookings;



