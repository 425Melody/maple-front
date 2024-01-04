//配置axios

import axios from 'axios'

const httpInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout:5000
})

//请求拦截器

//响应拦截器

export default httpInstance