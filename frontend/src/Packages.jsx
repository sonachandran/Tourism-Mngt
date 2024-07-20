import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import munnar from './Images/munnar.jpeg'
import hyderabad from './Images/hyderabad.jpg'
import kashmir from './Images/kashmir.jpg'
import manali from './Images/manali.jpg'
import paris from './Images/paris.jpg'
import mysore from './Images/mysore.jpg'
import { Link } from 'react-router-dom';


const Packages = () => {
  return (
    <>
      <h2 className='heading flex'>Packages</h2>
      <div className='ms-4 me-4 flex mt-5 mb-5' style={{ gap: '60px' }} >
        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src={munnar} />
          <Card.Body>
            <Card.Title className='flex'>Munnar</Card.Title>
            <Card.Text>

            </Card.Text>
            <div className='flex' >
            <Link to='/registration'><Button variant="primary" style={{ width: '130px' }} className='bg '>BookNow</Button></Link>
            </div>
          </Card.Body>
        </Card>

        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src={hyderabad} />
          <Card.Body>
            <Card.Title className='flex'>Hyderabad</Card.Title>
            <Card.Text>

            </Card.Text>
            <div className='flex' >
            <Link to='/registration'><Button variant="primary" style={{ width: '130px' }} className='bg '>BookNow</Button></Link>            </div>
          </Card.Body>
        </Card>


        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src={paris} />
          <Card.Body>
            <Card.Title className='flex'>Paris</Card.Title>
            <Card.Text>

            </Card.Text>
            <div className='flex' >
            <Link to='/registration'><Button variant="primary" style={{ width: '130px' }} className='bg '>BookNow</Button></Link>            </div>
          </Card.Body>
        </Card>


        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" style={{ height: '215px' }} src={manali} />
          <Card.Body>
            <Card.Title className='flex'>Manali</Card.Title>
            <Card.Text>

            </Card.Text>
            <div className='flex' >
            <Link to='/registration'><Button variant="primary" style={{ width: '130px' }} className='bg '>BookNow</Button></Link>            </div>
          </Card.Body>
        </Card>


        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src={kashmir} />
          <Card.Body>
            <Card.Title className='flex'>Kashmir</Card.Title>
            <Card.Text>

            </Card.Text>
            <div className='flex' >
            <Link to='/registration'><Button variant="primary" style={{ width: '130px' }} className='bg '>BookNow</Button></Link>            </div>
          </Card.Body>
        </Card>

      </div>
    </>
  )
}

export default Packages