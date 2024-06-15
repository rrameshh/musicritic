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


var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET



var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  

//   router.get('/auth/login', (req, res) => {

//     var scope = "streaming \
//                  user-read-email \
//                  user-read-private"
  
//     var state = generateRandomString(16);
  
//     var auth_query_parameters = new URLSearchParams({
//       response_type: "code",
//       client_id: spotify_client_id,
//       scope: scope,
//       redirect_uri: "http://localhost:5173/auth/callback",
//       state: state
//     })
  
//     res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
//   })
  

//   app.get('/auth/callback', (req, res) => {

//     var code = req.query.code;
  
//     var authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       form: {
//         code: code,
//         redirect_uri: "http://localhost:5173/auth/callback",
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
//         'Content-Type' : 'application/x-www-form-urlencoded'
//       },
//       json: true
//     };
  
//     request.post(authOptions, function(error, response, body) {
//       if (!error && response.statusCode === 200) {
//         var access_token = body.access_token;
//         res.redirect('/')
//       }
//     });
//   })

//   app.get('/auth/token', (req, res) => {
//     res.json(
//        {
//           access_token: access_token
//        })
//   })

