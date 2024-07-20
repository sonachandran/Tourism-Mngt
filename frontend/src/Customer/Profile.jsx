import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import img from '../Images/profile.jpg'
import { Link } from 'react-router-dom'
import { baseUrl } from '../Url'


const Profile = () => {
    const [profile, setprofile] = useState('')
    useEffect(() => {
        viewprofile()
    }, [])
    const viewprofile = async (event) => {
        const userid = localStorage.getItem('id')
        console.log('userid', userid);
        let response = await axios.get(`${baseUrl}/viewprofile/${userid}`)
        setprofile(response.data)
    }
    console.log('profiledetails:', profile);
    return (
<div className='row'>
   
    <div className='col'>
        <div className='background2'>
            <div className='profile'>
                <div style={{ marginLeft: '15%', marginTop: '10%', maxWidth: '300px' }}>
                    <h3 className='heading mb-3' style={{ color: "rgb(73, 99, 77)", maxWidth: '300px' }}><b>USER PROFILE</b></h3>
                    <label htmlFor=""><b>Name: {profile.firstname}</b></label> <br />
                    <label htmlFor=""><b>Last Name: {profile.lastname}</b></label> <br />
                    <label htmlFor=""><b>Email: {profile.email}</b></label><br />
                    <label htmlFor=""><b>City: {profile.city}</b></label><br />
                    <label htmlFor=""><b>Type: {profile.type}</b></label><br />
                    <div className='mt-2'>
                        <button className='heading btn2'>
                            <Link to='/customer/editprofile' className='link'>Edit Profile</Link>
                        </button>
                        <span style={{ margin: '0 15px' }}></span> {/* Adding a gap using inline style */}
                        <button className='heading btn2'>
                            <Link to='/customer/viewbookings' className='link'>Booking Details</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className='col' style={{ marginTop: '80px', marginRight: '50px' }}>
        <img src={img} alt="" className='img-fluid' style={{ width: '600px' }} />
    </div>
</div>


    )
}

export default Profile