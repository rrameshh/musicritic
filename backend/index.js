const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"57152000",
    database: "logs"
})


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
    // const values = [
    // req.body.profile,
    // req.body.albumID,
    // req.body.albumName,
    // req.body.review,
    // req.body.rating,
    // req.body.data_listened,];
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

app.listen(8808, () => {
    console.log("connected to backend");
}) 
