import React from 'react'

const Footer = () => {
  return (
   <>
   <div style={{backgroundColor:'black',height:'auto',
              color:'white',marginTop:'100px'}}>
    <div className='row' style={{padding:'30px',paddingLeft:'100px',lineHeight:'25px',gap:'80px'}}>
        <div className='col'>
           <b>ABOUT US</b>
            <div className='mt-2'> Our platform is designed to connect you with the world's most captivating tourism packages, curated by top agencies, to ensure that your travel dreams become reality.</div>
        </div>
        <div className='col'>
            <b>BRANCH LOCATION</b>
            <div className='mt-2'>India</div>
            <div>Usa</div>
            <div>Japan</div>
            <div>France</div>
        </div>
        <div className='col'>
            <b>QUICK LINKS</b>
            <div className='mt-2'> Home</div>
            <div>Booking</div>
            <div>Packages</div>
            
            <div>Services</div>
            <div>Review</div>
        </div>
        <div className='col'>
            <b>FOLLOW US</b>
            <div className='mt-2'>Instagram</div>
            <div>Facebook</div>
            <div>Linkedin</div>
        </div>
        <hr/>
    </div>

   </div>
   
   </>
  )
}

export default Footer