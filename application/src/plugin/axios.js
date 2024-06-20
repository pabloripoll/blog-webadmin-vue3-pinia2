import axios from 'axios'
//import

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_V1,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

export default instance