import axios from 'axios';
import React, { useState } from 'react';
import { toast,ToastContainer } from 'react-toastify';
import { baseUrl } from '../Url';

const Day1 = () => {
  // State variables to store form data
  const [activities, setActivities] = useState([]);
  const [activityInput, setActivityInput] = useState(''); // State for input field
  const [foodOptions, setFoodOptions] = useState([]);
  const [foodOptionInput, setFoodOptionInput] = useState(''); // State for input field
  const [accommodation, setAccommodation] = useState('');

  // Function to handle submission of form data
  const handleSubmit =async (e) => {
    e.preventDefault();

     let response=await axios.post(`${baseUrl}/day1`,{activities,foodOptions,accommodation})
     if(response.data){
        toast.success("success")
     }
     else{
        toast.error('error')
     }
    console.log('Submitted Data:', { activities, foodOptions, accommodation });
    // Clear the form fields after submission
    setActivities([]);
    setActivityInput('');
    setFoodOptions([]);
    setFoodOptionInput('');
    setAccommodation('');
  };

  // Function to add an activity to the list
  const addActivity = () => {
    if (activityInput.trim() !== '') {  //trim remove white spaces //activityinput if  not empty
      setActivities([...activities, activityInput]);
      setActivityInput(''); // Clear the input field
    }
  };

  // Function to add a food option to the list
  const addFoodOption = () => {
    if (foodOptionInput.trim() !== '') {
      setFoodOptions([...foodOptions, foodOptionInput]);
      setFoodOptionInput(''); // Clear the input field
    }
  };

  return (

    <div>
      <h2>Add Day 1 Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="activities">Our Services:</label>
          <ul>
            {activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
          <input type="text" value={activityInput} onChange={(e) => setActivityInput(e.target.value)} />
          <button type="button" onClick={addActivity}>Add Activity</button>
        </div>
        <div>
          <label htmlFor="foodOptions">Food Options:</label>
          <ul>
            {foodOptions.map((foodOption, index) => (
              <li key={index}>{foodOption}</li>
            ))}
          </ul>
          <input type="text" value={foodOptionInput} onChange={(e) => setFoodOptionInput(e.target.value)} />
          <button type="button" onClick={addFoodOption}>Add Food Option</button>
        </div>
        <div>
          <label htmlFor="accommodation">Accommodation:</label>
          <input type="text" id="accommodation" value={accommodation} onChange={(e) => setAccommodation(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer/>
    </div>
   
  );
};

export default Day1;

