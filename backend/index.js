const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");

const app = express();
require('dotenv').config()

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});



app.get("/", (req, res)=>{
    res.json("Hello this is the backend")
})

app.get("/song_reviews", (req, res)=>{
    const q = "SELECT * from song_reviews"
    db.query(q, (err,data)=>{
        if (err) {
            console.log(err);
            return res.json(err)
        } 
        return res.json(data)
    })
})

app.post("/song_reviews", (req, res) => {
    const q = "INSERT INTO song_reviews(`profile`, `albumID`, `albumName`, `review`, `rating`, `date_listened`) VALUES (?)";
    const values = [
        req.body.profile,
        req.body.albumID,
        req.body.albumName,
        req.body.review,
        req.body.rating,
        req.body.date_listened
    ];
     
    db.query(q, [values], (err, data)=> { 
        if (err) return res.json(err); 
        return res.json("Song_review has been created succesfully");
    })
}) 


app.get("/song_reviews/:albumId", (req, res) => {
    const albumId = req.params.albumId;
    const q = "SELECT * from song_reviews WHERE albumID = ?";
    db.query(q, [albumId], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        } 
        console.log(data)
        return res.json(data);
    });
});


app.delete("/song_reviews/:id", (req, res) => {
    const reviewId = req.params.id;
    const q = "DELETE FROM song_reviews WHERE id = ?";
    db.query(q, [reviewId], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json("review has been deleted succesfully");
    });
});

const port = process.env.DB_PORT; // Use port from environment variable or default to 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
