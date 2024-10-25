import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import "../assets/css/Style.css";

export default function UpdatingForm() {
 const navigate =useNavigate();
  const location = useLocation(); 
  const { editdata, index } = location.state || {};
  const {Data, setData} = useContext(DataContext);
  
  const [userData, setuserData] = useState(editdata ? editdata : { name: '', gender: '', count: 0 });
 const handleUsername =(e) =>{
  setuserData({...userData, name: e.target.value});
 };

 let increase =() =>{
  setuserData({...userData, count:userData.count+1 });
 }

 let decrease =() =>{
  setuserData({...userData, count: Math.max(0, userData.count -1)});
 }
   // Handle form submission
   const handleSubmit = (event) => {
   
    event.preventDefault();
  
  };

  const updateData = (event ) =>{
       // Update the Data with the edited user data at the correct index
       const updatedData = Data.map((item, i) => i === index ? userData : item);
    
       // Update the data in context
       setData(updatedData);
   
       // Navigate back to the list
       navigate('/');

    event.preventDefault(); 
  }
  // Function to toggle gender
  const genderHandler = (selectedGender) => {
    setuserData({ ...userData, gender: selectedGender });
  };

  return (
    <div className='main_container'>
       <div className='left_div'>
          <form onSubmit={handleSubmit}>
            <div className="form-group ">
              <label >Name: </label>
              <input type='text'  className="form-control" value={userData.name} onChange={handleUsername}/>
            </div>

            <div className="form-group">
              <label>Gender:</label>
              <div className='toggle_btn'>
                <button type="button" value={userData.gender} className={`btn ${userData.gender === 'Male' ? 'btn btn-danger' : 'btn-outline'}`} onClick={ () => genderHandler ('Male')} >Male</button>
                <button type="button" value={userData.gender} className={`btn ${userData.gender === 'Female' ? 'btn btn-danger' : 'btn-outline'}`} onClick={ () => genderHandler ('Female')}>Female</button>
              </div>
            </div>

            <div className="form-group">
              <label>Medals:</label>
              <button className="control__btn" onClick={increase}>+</button>
              {userData.count}
              <button className="control__btn" onClick={decrease} >-</button>
            </div>
            <button className='update_btn' onClick={updateData} > Update</button>
          </form>
        </div>
    </div>
  )
}
