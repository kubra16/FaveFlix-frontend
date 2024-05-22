# FaveFlix

## Introduction

FaveFlix is a web application that allows users to search for movies, create personalized movie lists, and share them with others. This project is built using the MERN stack (MongoDB, Express, React, Node.js) and uses the OMDB API for fetching movie data.

## Features

- User authentication (Sign Up/Sign In)
- Movie search functionality
- Create, view, and manage movie playlist
- Public , private and delete playlist options

## Installation

### Prerequisites

- Node.js
- MongoDB

### Setup Instructions

1. **Clone the backend repository :**

- Link for backend repository

```bash
  https://github.com/kubra16/FaveFlix-backend
```

```bash
git clone https://github.com/kubra16/FaveFlix-backend.git
cd FaveFlix-backend
```

2. **Backend Setup:**

   - Install dependencies:

   ```bash
   npm install
   ```

   - Create a `.env` file with the following variables:
     ```
     BASE_URL=your_mongo_database_uri
     JWT_SECRET=your_jwt_secret
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Clone the frontend repository:**

   - Link for frontend repository

```bash
  https://github.com/kubra16/FaveFlix-frontend
```

```bash
git clone https://github.com/kubra16/FaveFlix-frontend.git
cd FaveFlix-frontend
```

4. **Frontend Setup:**

- Install dependencies:

```bash
npm install
```

- Create a `.env` file with the following variable:

  ```
  REACT_APP_BASE_URL=http://localhost:5000/
  REACT_APP_API_KEY=your_omdb_api_key
  ```

- Start the frontend development server:
  ```bash
  npm start
  ```

5. **Access the application:**

- Open your browser and go to `http://localhost:3000`

6. **Access the deployed application:**

```bash
  https://fave-flix-frontend.vercel.app/
```
