
import React from 'react';
import { ToastContainer} from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import img2 from './Images/img2.jpg';

const About = () => {

    const notify = () => {
        toast.success('Please Register', {
            position: 'top-center'
        });
    }
    

    return (
        <div className='container' style={{marginTop:'150px',marginBottom:'150px'} }>
            <div className='row '>
                <div className='col me-5 '>
                    <img className='img2 img-fluid  ' src={img2} alt="" />
                </div>

                <div className='col about '>
                    <h5>ABOUT US</h5> <hr />
                    <h2 className='heading  '>Welcome To <span className='color'>Travel</span></h2>

                    <div >we believe that every journey should be an adventure, every destination a discovery, and every traveler a storyteller. Our platform is designed to connect you with the world's most captivating tourism packages, curated by top agencies, to ensure that your travel dreams become reality.</div>
                    
                    <ul>
                        <li>24/7 Services</li>
                        <li>First Class Flights</li>
                        <li> 5 star Accommodations</li>
                        <li>Handpicked Hotels</li>
                        <li>Latest Model Vehicles</li>
                    </ul>
                    <div className=''>
                        <button style={{
                            padding:'6px',
                            border:'none',
                            backgroundColor:'rgb(4, 170, 112)',
                            borderRadius:'15px',
                            width:'130px',
                            color:'white'
                        }} onClick={notify}>Book Now</button>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
