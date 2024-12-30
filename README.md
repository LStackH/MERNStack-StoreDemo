# Author Lukas Honka

# MERN-Stack, Modern Online-Store Demo

# This repo includes both the backend and the frontend, Learning Diary and this README

# Video demo of the stack running locally: https://lut-my.sharepoint.com/:v:/g/personal/lukas_honka_student_lut_fi/ESFrPz3bKiFKot7nR66MY9YB-IjN9RCSD3VpH14_FgphyA?e=AsT2rt&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D

# How to run locally:
To run this project in full, you will need to have MongoDB installed locally. For ease of use, MongoDBCompass is recommended to interact with your databases.

To connect your database, create your own ```.env``` file in the ```/backend/``` folder.
In the .env, setup these variables:
```
NODE_ENV = development
PORT={your chosen port, without brackets}
MONGO_URI = mongodb://127.0.0.1:27017/{your chosen name for the database, without brackets}
JWT_SECRET = {your chosen secret key used for JWT, without brackets}
```
Then for the frontend, you will also need to create ```.env``` file in the ```/frontend/``` folder.
In the .env, setup these variables: 
```
REACT_APP_API_URL=http://localhost:{your chosen port in the backend .env, without the brackets}
```
You will also need to make sure that the vite.config.ts in the frontend folder will match, example:
```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: {your chosen port for frontend},
    proxy: {
      "/api": {
        target: "http://localhost:{your chosen port for backend}",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:{your chosen port for backend}",
        changeOrigin: true,
      },
    },
  },
});
```


You need to run both the backend and the frontend. 
To start the backend server, you can navigate into the backend folder and run 
```
npm start
```
To start the frontend, open another terminal, so that you don't close the backend process, and navigate into the frontend folder and run 
```
npm run dev
```

Now both the backend and frontend are running. 

Going into your browser and opening the link provided in the terminal, after starting the frontend
OR
Manually typing into your browser localhost:{your chosen port for frontend}
