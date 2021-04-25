require("dotenv").config();
//get the API URL form .env file
export const API = process.env.REACT_APP_API_URL;

//get the SECRET from the .env file.
//the secret key is required to create an admin account
export const SECRET = process.env.ADMIN_SECRET;
