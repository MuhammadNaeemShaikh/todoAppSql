import { useState } from 'react';
import './addrecord.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateRecord = () => {

  const navigate = useNavigate();
  const location = useLocation();

  let bookId = location.pathname.split('/')[2]

  const [user, setUser] = useState({
    title: "",
    price: "",
    desc: "",
  });

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const recordUpdate = async () => {
    const { title, price, desc } = user;
    if (title && price && desc) {
      alert("posted");
      const res = await axios.put('http://localhost:8800/update/'+bookId, user)
      if (res.data === "book has been updated") {
        alert("Books has been successfully added");
        navigate('/')
      }
      else {
        alert("error");
        console.log(res.data)
      }

    }
    else {
      alert("invalid input")
    }
  }

  const showRecords = () =>{
    navigate("/")
  }

  return (
    <div className="form">
      <h1> New Records </h1>
      <input type="text" required name="title" onChange={inputHandler} placeholder="Enter Book title" />
      <input type="number" required name="price" onChange={inputHandler} placeholder="Enter Book Price" />
      <textarea name="desc" id="" cols="42" rows="5" onChange={inputHandler}></textarea>
      <div className="button" onClick={recordUpdate}>UPDATE RECORDS</div>
      <div>or</div>
      <div className="button" onClick={showRecords}>SHOW RECORDS</div>
    </div>
  )

}

export default UpdateRecord;