import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import agency5 from '../Images/agency5.jpg'
import { baseUrl } from '../Url'


const Agencyprofile = () => {
    const [profile, setprofile] = useState('')
    useEffect(() => {
        agencyprofile()
    }, [])
    const agencyprofile = async (event) => {
        const userid = localStorage.getItem('id')
        console.log('userid', userid);
        let response = await axios.get(`${baseUrl}/agencyprofile/${userid}`)
        setprofile(response.data)
    }
    console.log('profiledetails:', profile);
    return (


        <>


            <h3 className='heading flex mt-4'>Agency Profile Information</h3>
            <div className='row'>
                <div className='col'>
                    <div className='' style={{ margin: '30px', fontSize: '18px' }} >
                        <div >
                            <h4><b>Agency Information</b></h4>
                            <div>AgencyName:         {profile.agencyname}</div>
                            <div>Type:         {profile.type}</div>
                            <div>City:         {profile.city}</div>
                            <div>State:         {profile.state}</div>
                            <div>Country:         {profile.country}</div>
                            <div>Password:         {profile.password}</div>

                        </div>
                        <div style={{ marginTop: '50px' }}>
                            <h4><b>Contact Information</b></h4>
                            <div>Email Address:         {profile.agencyname}</div>
                            <div>Phone:         {profile.phone}</div>


                        </div>


                    </div>
                    <div className='ms-4 flex justify-content-evenly '>
                       <Link to='/agency/updateprofile'> <button style={{
                           
                            color: 'white',
                            borderRadius: '10px',
                            border:'none',
                            padding: '6px',

                        }} className='bg'>Edit profile</button></Link>

                      <Link to='/agency/viewpackage'> <button style={{
                          
                            color: 'white',
                            borderRadius: '10px',
                              border:'none',
                            padding: '6px',

                        }} className='bg'>View packages</button></Link> 
                    </div>
                </div>
                <div className='col'>
                    <img className=' img-fluid ' src={agency5} alt="" style={{ height: '500px' }} />
                </div>
            </div>

        </>

    )
}

export default Agencyprofile