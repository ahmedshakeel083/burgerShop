import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgermaker-bafd9.firebaseio.com/'
});

export default instance;