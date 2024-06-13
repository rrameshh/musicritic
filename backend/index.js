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

function keepConnectionAlive() {
    connection.query('SELECT 1', (error, results, fields) => {
      if (error) {
        console.error('Error keeping connection alive:', error);
      } else {
        console.log('Connection kept alive');
      }
    });
  }

  setInterval(keepConnectionAlive, 5 * 60 * 1000); // 5 minutes
  


  

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
    const { profile, albumID, albumName, review, rating, date_listened, profileID, profileIMG } = req.body;//, profileID, profileIMG } = req.body;
    
    // Validate required fields
    if (!profile || !albumID || !albumName || !review || !rating || !profileID || !profileIMG) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Additional data validation can be added here

    const q = "INSERT INTO song_reviews(`profile`, `albumID`, `albumName`, `review`, `rating`, `date_listened`, `profileID`, `profileIMG`) VALUES (?)";
    const values = [profile, albumID, albumName, review, rating, date_listened, profileID, profileIMG];
     
    db.query(q, [values], (err, data)=> { 
        if (err) {
            console.error("Error inserting song review:", err);
            return res.status(500).json({ error: "Failed to create song review" });
        }
        console.log(values[6]);
        console.log(values[7]);
        return res.json(values[6] + values[7] + "Song review has been created successfully");
    });
});



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
