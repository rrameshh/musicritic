## Spotiboxd
Spotiboxd is a web application inspired by Letterboxd, but with Spotify integration. Users can search, review, and rate albums, through the Spotify API

#Features
Album Database: Browse a vast database of albums, view details, and reviews.
Rating & Reviews: Users can rate and review movies.

Technologies Used
Frontend
React: A JavaScript library for building user interfaces.
Tailwind CSS: A utility-first CSS framework for building custom designs quickly.
Axios: Promise-based HTTP client for the browser and Node.js.
React Router: Declarative routing for React.
Vite: for deployment

Backend
Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
Express.js: Fast, unopinionated, minimalist web framework for Node.js.
MySQL: To manage reviews in a database
Spotify API: Integrate Spotify API to fetch playlist, album, and track details
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/rrameshh/spotiboxd.git
Navigate to the project directory:

bash
Copy code
cd spotiboxd
Install dependencies:

Copy code
npm install
Set up environment variables:

Create a .env file in the root of the backend directory with the following variables:

makefile
SPOTIFY_CLIENT_ID=yourclientid
SPOTIFY_CLIENT_SECRET=yourclientsecret
Run the backend server:

bash
Copy code
cd backend
npm start
Run the frontend:

bash
Copy code
cd spotiboxd
npm run dev

Contributing
Contributions are welcome! Feel free to submit pull requests or open issues for bug fixes, new features, or enhancements.

License
This project is licensed under the MIT License.
