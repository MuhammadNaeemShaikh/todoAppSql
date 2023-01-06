import { useState } from 'react';
import './addrecord.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddRecord = () => {

  const [user, setUser] = useState({
    title: "",
    price: "",
    desc: "",
  });

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const Add = async () => {
    const { title, price, desc } = user;
    if (title && price && desc) {
      const res = await axios.post('http://localhost:8800/books', user)
      if (res.data === "Books has been successfully added") {
        alert("Books has been successfully added");
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

  return (
    <div className="form">
      <h1> New Records </h1>
      <input type="text" required name="title" onChange={inputHandler} placeholder="Enter Book title" />
      <input type="number" required name="price" onChange={inputHandler} placeholder="Enter Book Price" />
      <textarea name="desc" id="" cols="42" rows="5" onChange={inputHandler}></textarea>
      <div className="button" onClick={Add}>Add</div>
      <div>or</div>
      <Link to="/"><div className="button">SHOW RECORDS</div></Link>
    </div>
  )

}

export default AddRecord;