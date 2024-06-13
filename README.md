# Musicritic

Musicritic is a web application inspired by Letterboxd, but with Spotify integration. Users can review and rate songs, create watchlists, and discover new music based on their preferences through the Spotify API. Authorization is done with OAuth and PKCE

![Homepage GIF](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWlmMWtrMW1sY2Npd2w0dGh5MjludGJ2ZTZpdHFjNGpiZGw3Z2JwdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ra7fRbtwsQlqKYWDnH/giphy.gif)

## Features

- **Song Database**: Browse a vast database of albums, tracks, and playlists.
- **Rating & Reviews**: Users can rate and review movies.
- **Spotify Integration**: Discover music related to your movie preferences through Spotify API.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for building custom designs quickly.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **React Router**: Declarative routing for React.
- **Vite**: for deployment/packaging

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MySQL**: To Create, Read, Update, and Delete reviews per album in the database
- **Spotify API**: Integrate Spotify API to fetch albums and playlists

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/rrameshh/spotiboxd.git
   ```

2. Navigate to the project directory:

   ```
   cd spotiboxd
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Set up environment variables:
   
   Create a `.env` file in the root of the `backend` directory with the following variables:

   ```
   SPOTIFY_CLIENT_ID=yourclientid
   SPOTIFY_CLIENT_SECRET=yourclientsecret
   ```

5. Run the backend server:

   ```
   cd backend
   npm start
   ```

6. Run the frontend:

   ```
   cd frontend
   npm run dev
   ```

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for bug fixes, new features, or enhancements.

## License

This project is licensed under the [MIT License](LICENSE).
