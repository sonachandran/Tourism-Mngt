import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { baseUrl } from '../Url';



const Viewbookings2 = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(2); // Start from page 2 to fetch next set of bookings
  const [itemsPerPage] = useState(8); // represents the number of bookings to display per page, which is set to 10.

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

//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

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
                <li key={index} className={`page-item ${currentPage === index + 2 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 2)}>
                    {index + 2}
                  </button>
                </li>
              ))}
            </ul>
          )} */}
        </div>
        <Link to="/agency/viewbooking"className='mb-5 ms-5'><FaArrowLeft  style={{fontSize:'25px' }}/>previous</Link>
        <Link to="/agency/viewbookings3" className='mb-5 ms-5'><FaArrowRight style={{fontSize:'25px' }}/>Next</Link>

      </div>
    </div>
  );
};

export default Viewbookings2;

