import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../Url'
const Agencyinterface = () => {
    const [agency,setagency]=useState('')
    const [refresh,setrefresh]=useState('')

    useEffect(()=>{
        const fetchagency=async()=>{
           const response=await axios.get(`${baseUrl}/viewagencies`)
           setagency(response.data)
        }
        fetchagency()
        },[refresh])
        console.log('agencies',agency);


        const deleteagency = async (id) => {
        
            setrefresh(!refresh)
            let response = await axios.delete(`${baseUrl}/deleteagency/${id}`)
            console.log('response', response);
        
          }
    


        const verifyAgency = async (agencyId) => {
            try {
           const response= await axios.put(`${baseUrl}/agencyverification/${agencyId}`);
           console.log('ddj',response);
           setagency(agency.map(agency => agency._id === agencyId ? { ...agency, verified: true } : agency));
          } catch (error) {
            console.error('Error verifying user:', error);
          }
        };
  return (
  <>
   {agency && (
            <>
                <div>
                    <h4 className='heading flex mt-4 mb-5'>AgencyVerification</h4>
                    <table className='user-table ms-3 me-3'>
                        <thead>
                            <tr>
                                <th>AgencyName</th>
                                <th>City</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {agency.map(agency => (
                                <tr key={agency._id}>
                                    <td>{agency.agencyname} </td>
                                    <td>{agency.city}</td>
                                    <td>{agency.email}</td>
                                    <td>{agency.verified ? 'Verified' : 'Not Verified'}</td>
                                    <td>
                                        {!agency.verified && (
                                            <button className='bg' style={{color:'white'}} onClick={() => verifyAgency(agency._id)}>Verify</button>
                                        )}
                                    </td>

                                    <button
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      padding: '4px 10px', // Adjust padding for smaller button
                      fontSize: '14px',
                      marginTop: '6px' // Adjust font size for smaller button
                    }}
                    onClick={() => deleteagency(agency._id)}
                  >
                    Cancel
                    
                  </button>
                  
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </>
        )}
    </>
  )
}

export default Agencyinterface