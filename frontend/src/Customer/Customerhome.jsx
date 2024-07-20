// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import Viewpackages from './Viewpackages'
// import Viewreviews from '../Admin/Viewreviews'
// import Viewreview from './Viewreview'
// import Footer from '../Footer'
// import Services from '../Services'
// import Modal from 'react-modal';
// import Booking from './Booking';


// const Customerhome = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);


//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (

//     <>
//       <div className='cust '>
//         <div className='flex'>
//           <div style={{ color: 'white', letterSpacing: '2px', marginTop: '180px', fontSize: '1px' }}>
//             <b style={{ paddingLeft: '160px', fontSize: '23px', lineHeight: '45px' }}>Travel makes one modest <br /> You see what a tiny place you occupy in the world..</b>
//           </div>
//         </div>
//         <div className='flex '> <button className='btn' style={{
//           color: 'white', padding: '8px', borderRadius: '18px', border: 'none'
//         }} onClick={openModal}>Book Now</button></div>

//         <Modal
//           isOpen={isModalOpen}
//           onRequestClose={closeModal}
//           className="custom-modal"
//           overlayClassName="custom-overlay"
//           style={{
//             content: {
//               marginTop: '50px',
//               top: '50%',
//               left: '50%',
//               right: 'auto',
//               bottom: 'auto',
//               marginRight: '-50%',
//               transform: 'translate(-50%, -50%)',
//               zIndex: 1000, // Ensure a high z-index
//               position: 'fixed', // Ensure the modal stays in place
//               backgroundColor: 'transparent', // Add a background color
//               padding: '20px',
//               // Optional: Add padding
//               borderRadius: '8px',


//               maxHeight: '90vh', // Limit the maximum height of the modal
//               overflowY: 'hidden'// Optional: Add border radius
//             }
//           }}
//         >
//           <button style={{ border: 'none', maxHeight: 'calc(80vh - 40px)', overflowY: 'auto' }} onClick={closeModal}>close</button>
//           <Booking />
//         </Modal>

//       </div>
//       <Viewpackages />
//       <Viewreview />
//       <Services />
//       <Footer />



//     </>

//   )
// }

// export default Customerhome



import React, { useState } from 'react';
import Modal from 'react-modal';
import Booking from './Booking';
import Viewpackages from './Viewpackages';
import Viewreview from './Viewreview';
import Footer from '../Footer';
import Services from '../Services';

Modal.setAppElement('#root'); // This is necessary for screen readers accessibility.

const Customerhome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Restore background scrolling
  };

  return (
    <>
      <div className='cust'>
        <div className='flex'>
          <div style={{ color: 'white', letterSpacing: '2px', marginTop: '180px', fontSize: '1px' }}>
            <b style={{ paddingLeft: '160px', fontSize: '23px', lineHeight: '45px' }}>
              Travel makes one modest <br /> You see what a tiny place you occupy in the world..
            </b>
          </div>
        </div>
        <div className='flex'>
          <button
            className='btn'
            style={{
              color: 'white',
              padding: '8px 16px',
              borderRadius: '18px',
              border: 'none',
              cursor: 'pointer' // Change cursor to pointer
            }}
            onClick={openModal}
          >
            Book Now
          </button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="custom-modal"
          overlayClassName="custom-overlay"
          style={{
            content: {
              marginTop: '80px',
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              position: 'fixed',
              backgroundColor: 'white',
              padding: '10px',
              borderRadius: '8px',
              maxHeight: '90vh',
              overflow: 'hidden' // Prevent scrollbar
            }
          }}
        >
          <div className="custom-modal-content">
            <button
              className="custom-close-button"
              onClick={closeModal}
            >
              &times;
            </button>
            <Booking />
          </div>
        </Modal>
      </div>
      <Viewpackages />
      <Viewreview />
      <Services />
      <Footer />
    </>
  );
};

export default Customerhome;
