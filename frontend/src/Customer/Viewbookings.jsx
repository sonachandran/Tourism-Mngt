import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../Url'


const Viewbookings = () => {
  const [booking, setbooking] = useState('')
  const [refresh, setrefresh] = useState(false)

  useEffect(() => {
    const viewbooking = async () => {
      const userid = localStorage.getItem('id')
      let response = await axios.get(`${baseUrl}/viewbookings/${userid}`)
      setbooking(response.data)
    }
    viewbooking()
  }, [refresh])
  console.log('booking details', booking);

  const deletebooking = async (id) => {
    setrefresh(!refresh)
    let response = await axios.delete(`${baseUrl}/deletebookings/${id}`)
    console.log('response', response);

  }
  return (


    < div className='me-4 ms-5'>
      {booking && (
        <>
          <h3 className='flex heading mt-4 mb-5 '>Booking Details</h3>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Destination</th>
                <th scope="col">HowMany</th>
                <th scope="col">ArrivalDate</th>
                <th scope="col">LeavingDate</th>
                <th scope="col">Accommodation</th>
                <th scope="col">Transportation</th>

              </tr>
            </thead>
            <tbody>
              {booking.map((item, index) => (
                <tr key={index}>
                  <td>{item.destination}</td>
                  <td>{item.howmany}</td>
                  <td>{item.arrivals}</td>
                  <td>{item.leaving}</td>
                  <td>{item.accommodation}</td>
                  <td>{item.transportation}</td>

                  <button
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      padding: '4px 10px', // Adjust padding for smaller button
                      fontSize: '14px',
                      marginTop: '6px' // Adjust font size for smaller button
                    }}
                    onClick={() => deletebooking(item._id)}
                  >
                    Cancel
                  </button>


                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>


  )
}

export default Viewbookings