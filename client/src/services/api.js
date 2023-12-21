import axios from 'axios';

export const instance = axios.create({
    baseURL:"https://mern-authentication-zdj0.onrender.com/api/auth/user"
})