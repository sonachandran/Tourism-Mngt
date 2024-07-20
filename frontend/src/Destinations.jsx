import React from 'react'
import img1 from './Images/kolkata.jpg'
import img2 from './Images/taj.jpg'
import img3 from './Images/hyderabad2.jpg'
import img4 from './Images/ooty.jpg'
import img5 from './Images/mumbai.jpeg'
import img6 from './Images/kashmir2.jpg'


const Destinations = () => {
    return (
        <>
            <h3 className='heading flex mt-5'>Top Destinations</h3>
            <div className='flex ' style={{ gap: '30px' }} >

                <div className='dest-container'>
                    <img src={img1} className='dest' alt="mdkdkkd" />
                    <div className='dest-name'>Kolkata</div>

                </div>

                <div className='dest-container'>
                    <img src={img2} className='dest' alt="" />
                    <div className='dest-name'>Taj Mahal</div>

                </div>

                <div className='dest-container'>
                    <img src={img3} className='dest' alt="" />
                    <div className='dest-name'>Hyderabad</div>

                </div>

                <div className='dest-container'>
                    <img src={img4} className='dest' alt="" />
                    <div className='dest-name'>Ooty</div>

                </div>

                <div className='dest-container'>
                    <img src={img5} className='dest' alt="" />
                    <div className='dest-name'>Mumbai</div>

                </div>

                <div className='dest-container'>
                    <img src={img6} className='dest' alt="" />
                    <div className='dest-name'>Kashmir</div>

                </div>

            </div>
        </>
    )
}

export default Destinations
