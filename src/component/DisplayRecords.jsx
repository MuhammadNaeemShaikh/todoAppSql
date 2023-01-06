import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


function DisplayRecords() {

    const [books, setBooks] = useState([]);
    const [searchApiData, setsearchApiData] = useState('');
    const navigate = useNavigate();

    //fetching data from db

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get('http://localhost:8800/getbooks')
                setBooks(res.data);
                setsearchApiData(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBooks();
    }, []);

    //deleting data from db

    const dlt = async (e) => {
        try {
            let id = e;
            console.log("run");
            const res = await axios.put('http://localhost:8800/delete/' + id)
            console.log(res);
            window.location.reload();
        }
        catch (err) {
            console.log(err)
        }
    }

    //navigate to new records

    const clickRecords = () => {
        navigate("/addRecords")
    }

    //navigate to update records

    const navigateToUpdate = (e) => {
        let id = e;
        navigate(`/updateRecords/${id}`)
    }

    //searching data in db

    // const search = (e) =>{
    //     e.preventDefault();
    //     // console.log(books[0].title);
    //     console.log(serch);
    //     books.map((currentval,index)=>{
    //         if(currentval.title == serch){
    //             console.log(currentval);
    //         }
    //     })
    // }

    const handleFilter = (e) => {
        if (e.target.value === '') {
            setBooks(searchApiData);
        }
        else {
            // const filterresult = searchApiData.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
            const filterresult = searchApiData.filter((item)=>{
                return item.title.toLowerCase().includes(e.target.value.toLowerCase());
            })
            setBooks(filterresult)
        }
    }



    return (
        <>
            <nav className="navbar navbar-light  justify-content-end">
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" onChange={handleFilter} placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={clickRecords}>Add NEW RECORDS</button>
                </form>
            </nav>

            <table className="table table-striped">
                <thead classNameName='thead-dark'>
                    <tr>
                        <th scope="col">books</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">UPDATE</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((currentval, index) => {
                        return (
                            <tr key={currentval.id}>
                                <th scope="row">{currentval.id}</th>
                                <td>{currentval.title}</td>
                                <td>{currentval.desc}</td>
                                <td>{currentval.price}$</td>
                                <td><i className="fas fa-edit" onClick={() => navigateToUpdate(currentval.id)}></i></td>
                                <td onClick={() => dlt(currentval.id)}><i className="fas fa-trash text-danger" ></i></td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </>
    )
}

export default DisplayRecords