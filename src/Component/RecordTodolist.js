import { React, useState ,useContext} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate} from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import "../assets/css/Style.css";

const RecordTodolist = () => {
  let [name, setname] = useState('')
  let [count, setcount] = useState(0)
  let [gender, setGender] = useState('Male');
  let [searchName ,setsearchName] =useState('')
  const {Data, setData} = useContext(DataContext);
  const navigate = useNavigate();

  //increase counter
  let increase = (event) => {
    setcount(count + 1);
    event.preventDefault();
  }

  //decrease counter
  let decrease = (event) => {
    if (count > 0) {
      setcount(count - 1);
    }
    event.preventDefault();
  }

  ////object for storing values
  let formData = { name, count, gender }

  let handleSubmit = (event) => {
    //empty form not fill
    if (formData.name == '' || formData.gender == '') {
      toast.error("Fill the Form...")
    }
    else {
      //validation controll
      let checkFilterUser = Data.filter((v) => v.name == name)

      if (checkFilterUser.length == 1) {
        toast.error("Name Already Exist...")
      }
      else {
        let finalData = [...Data, formData]
        setData(finalData)
        // reset the form
        setname('')
        setGender('')
        setcount(0)
        toast.success("Form Submit Successfully....")

        event.preventDefault();

      }
    }

  }
  // Function to toggle gender
  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  let deleteRow = (index) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this row?");
    
    if (confirmDelete) {
        let spanData = Data.filter((v, i) => i !== index);
        setData(spanData);
        toast.warning("Record will be deleted from the list ");
    }
    else {
      toast.info("Deletion canceled");
    }
  };


  let editRow = (index) => {
    let editData = Data.filter((v, i) => i == index);
    navigate('/editRecord', { state: { editdata: editData[0], index: index } });

  };

  let search =(event) =>{
    let searchData = Data.filter((v,i) =>  v.name == searchName);
    setData(searchData)
    
  //  if (searchName == ''){
  //   toast.error("Enter your Name ...")
    
  //  }
  // else {
  //   toast.error("Name not found in the list...")
    event.preventDefault();
  // }
  
}

  return (
 <>
 

 <div className='main_container'>
      <ToastContainer />
      {/* {Data.length} */}
      <h1>Form </h1>
      <div className='form_div'>
        <div className='left_div'>
          <form>
            <div class="form-group ">
              <label >Name: </label>
              <input type='text' value={name} name='name' onChange={(e) => setname(e.target.value)} class="form-control" pattern="[A-Za-z]*" />
            </div>

            <div class="form-group">
              <label>Gender:</label>
              <div className='toggle_btn'>
                <button
                  type="button"
                  className={`btn ${gender === 'Male' ? 'btn btn-danger' : 'btn-outline'}`}
                  onClick={() => handleGenderChange('Male')}>Male</button>
                <button
                  type="button"
                  className={`btn ${gender === 'Female' ? 'btn btn-danger' : 'btn-outline'}`}
                  onClick={() => handleGenderChange('Female')}>Female</button>
              </div>
            </div>

            <div class="form-group">
              <label>Medals:</label>
              <button className="control__btn" onClick={increase}>+</button>
              {count}
              <button className="control__btn" onClick={decrease}>-</button>
            </div>

          </form>
        </div>
        <div className='right_div'>
          
          <div className='list_detail'>
          <h3>Show Submission Details</h3>
          <div className='search_div'>
              <input type='text' name='name' value={searchName} onChange={(e) => setsearchName(e.target.value)}/>
          
              <button type='button' className='search_btn' onClick={search}>Search</button>
          </div>
            {Data.length >= 1 ?

              Data.map((obj, i) => {
                return (
                <div className="listContainer">
                  <div className="record">
                  <ul key={i}>
                    <li> {i + 1}- <b>Name:</b> {obj.name} ,<b>Gender:</b> {obj.gender} ,<b>Medals:</b> {obj.count} <br/> 
                 
                  <div className="btn-span">
                    <button className='edit_btn' onClick={() => editRow(i)}>Edit</button>
                      <span onClick={() => deleteRow(i)}>&times;</span>
                    </div>
                    </li>
                  </ul>
                  </div>
                 </div>
                )
              })
              :
              <ul>
                <li>No Data Found</li>
              </ul>
            }

          </div>
        </div>
      </div>
      <button type="button" className='submit_btn' onClick={handleSubmit}>Submit</button>
      
    </div>


 </>
  );
}

export default RecordTodolist
