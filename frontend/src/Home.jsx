import React, { useState } from 'react'
import './Tourism.css'
import About from './About'
import Services from './Services'
import Booking from './Booking'
import Footer from './Footer'
// import travel from './Images/travel3.png'
import travel from './Images/background.jpg'
import Viewpackages from './Admin/Packageview'
import Packages from './Packages'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { FaLocationDot } from 'react-icons/fa6'
import { Card } from 'react-bootstrap'
import { IoIosSearch } from "react-icons/io";
import Destinations from './Destinations'
import Viewreview from './Customer/Viewreview'

const Home = () => {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/searchplace?q=${query}`);
      setResults(response.data);
      Navigate('./viewpackage')
    } catch (error) {
      console.error('Error occurred while searching:', error);
    }
  };
  console.log("hjjdj",results);

     
  const renderStars = (rating) => {

    const filledStars = '★'.repeat(rating);//creates an array
    const emptyStars = '☆'.repeat(5 - rating);
    return (
      <p>
        <span style={{ color: '#FFA500', fontSize: '30px' }}>{filledStars}</span> {/* Dark Yellow Color */}
        <span style={{ color: 'gray', fontSize: '30px' }}>{emptyStars}</span>
      </p>
    );
  };


  return (
<>
    <div className='back'>
        
        <h2 className='flex ' >
        <div className=''style={{color:'white',letterSpacing:'6px',marginTop:'140px' ,fontSize:'40px' }}>
         <div style={{paddingLeft:'105px',fontSize:'60px'}} className='home3'> Discover </div>  <div>The World With Us</div></div></h2>
        
        <label className='flex mt-3'style={{color:'white',fontSize:'30px'}} >Find Your Next Stay</label> 
        <div className='flex '>
        <input type="text"  placeholder='' style={{width:'450px',height:'40px',border:'none'}}  value={query} onChange={(e) => setQuery(e.target.value)} />
        <span >
        <button style={{width:'50px',height:'40px',border:"none"}} onClick={handleSearch}><IoIosSearch style={{fontSize:'25px'}}/></button>
        </span>
        </div>
     </div>



      {/* package view when browsing places by user */}
    {results && (
      <div>
        {results.map((item) => (


          <div className=''>
            <div className='flex mt-5 ' style={{marginBottom:'20px'}} >
              <img style={{
                height: '320px',
                width: '400px',
                borderTopLeftRadius: '20px',
                borderBottomLeftRadius: '20px',
                
                boxShadow:'0px 8px,10px grey '


              }} src={`http://localhost:7000/uploads/${item.image}`} alt="" />

              <div className='package'>

                <h3 className='mt-5 ms-3'><FaLocationDot style={{ color: 'darkorange' }} />{item.destination}</h3>
                <p className='ms-5'> Ratings:<span> {renderStars(item.rating)} </span></p>
                <b className='ms-5 '  style={{fontSize:'20px'}}>${item.price}</b>
                <Link to={`/detailpackagess/${item._id}`} >
                       <button className='ms-3'
                  style={{
                    marginTop:'30px',
                    backgroundColor: 'darkorange',
                    color: 'white', border: 'none',
                    height: '40px', width: '150px'

                  }}>ReadMore</button></Link>

                <div style={{ display: 'flex ', justifyContent: 'space-evenly', gap: '40px', marginTop: '30px', marginBottom: '10px' }}>

                 


                </div>

              </div>


            </div>
          </div>





        ))}
      </div>

    )}








   



<Destinations/>   
<Footer/>
   {/* <About />
      <Packages/>
      <Booking />
      <Services />
      <Footer /> */}
      </>

  )
}

export default Home




// // SearchPlaces.js
// import React, { useState } from 'react';
// import axios from 'axios';

// function Home() {
  // const [query, setQuery] = useState('');
  // const [results, setResults] = useState([]);

  // const handleSearch = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:7000/searchplace?q=${query}`);
  //     setResults(response.data);
  //   } catch (error) {
  //     console.error('Error occurred while searching:', error);
  //   }
  // };

//   return (
//     <div>
//       <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
//       <button onClick={handleSearch}>Search</button>
      
//       <div>
//         {results.map(place => (
//           <div key={place.id}>
//             <h2>{place.name}</h2>
//             <p>{place.location}</p>
//             <p>{place.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;
