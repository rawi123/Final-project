import axios from 'axios';

const app = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: { Authorization: localStorage.getItem("token")?`Bearer ${localStorage.getItem("token")}` : null }
});


export const getUser = async () => {
    try {
        const res = await app.get('/user/me');
        return res.data;
    }
    catch (err) {
        throw (err)
    }
}
