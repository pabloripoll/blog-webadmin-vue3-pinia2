import axios from 'axios'

/* const instance = axios.create({
    baseURL: ENV.APIREST_HPV1
}) */

const instance = axios.create({
    baseURL: ENV.APIREST_HPV1,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

export default instance