import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../Url';

const Admininterface = () => {
    const [users, setUsers] = useState('');
    const [refresh, setrefresh] = useState(false)


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${baseUrl}/viewusers`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [refresh]);
    console.log('users', users);

    const deleteusers = async (id) => {
        
        setrefresh(!refresh)
        let response = await axios.delete(`${baseUrl}/deleteuser/${id}`)
        console.log('response', response);
    
      }




    const verifyUser = async (userId) => {
    try {
    await axios.put(`${baseUrl}/userverification/${userId}`);
    setUsers(users.map(user => user._id === userId ? { ...user, verified: true } : user));
  } catch (error) {
    console.error('Error verifying user:', error);
  }
};


    return (
        <>
        {users && (
            <>
                <div>
                    <h4 className='heading flex mt-4 mb-5'>UserVerification</h4>
                    <table className='user-table ms-3 me-3'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>LastName</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.firstname} </td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.verified ? 'Verified' : 'Not Verified'}</td>
                                    <td>
                                        {!user.verified && (
                                            <button className='bg' style={{color:'white'}} onClick={() => verifyUser(user._id)}>Verify</button>
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
                    onClick={() => deleteusers(user._id)}
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
    
    );
};

export default Admininterface;
