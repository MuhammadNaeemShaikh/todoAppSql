import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// connecting db
const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"1234",
    database:"test"
})

db.connect(function (err) {
    if (err) {
        console.log('Error connecting to Database',err);
        return;
    }
    console.log('Connection established');
});


// fetching data from db
app.get("/getbooks",(req,res)=>{
    const q = "SELECT * FROM books";
    db.query(q,(err,data)=>{
        if(err) return res.send(err)
        return res.json(data)
    })

})


// inserting data into book
app.post("/books",(req,res)=>{

    const {title,desc,price} = req.body;

    const q = "INSERT INTO books (`title`,`desc`,`price`) VALUES(?)"
    const values = [title,desc,price]

    db.query(q,[values],(err)=>{
        if(err) return res.json(err)
        return res.json("Books has been successfully added");
    })

})


// delete data from books
app.put("/delete/:id",(req,res)=>{
  
    const q = "DELETE FROM books WHERE ID = ?"
    const bookId = req.params.id;

    db.query(q,[bookId],(err)=>{
        if(err) {
            res.json(err);  
        } 
        else{
            res.json("book has been deleted")
        }
    })
    
})

app.put("/update/:bookId",(req,res)=>{

    const bookId = req.params.bookId;
    console.log(bookId);
    console.log(req.body);

    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ? WHERE id = ?";
    const {title,desc,price} = req.body;
    const values = [title,desc,price]


    db.query(q,[...values,bookId],(err)=>{
        if(err) {
            res.json(err);  
        } 
        else{
            res.json("book has been updated")
        }
    })
    
})


app.listen(8800,()=>{
    console.log("connected to backend");
})