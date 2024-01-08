//配置axios

import axios from 'axios'

const httpInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000
})

//请求拦截器
httpInstance.interceptors.request.use(
    config => {
        // 从 localStorage 中获取 JWT 令牌
        const token = localStorage.getItem('Token');

        // 如果 JWT 令牌存在，将其添加到请求头中
        if (token) {
            //`${token}`模版字符串语法
            config.headers.Authorization = `${token}`;
        } else {
            // 如果 JWT 令牌不存在，可以进行跳转到登录页面的逻辑
            // 例如使用路由导航或其他方式
            console.error('JWT Token not found. Redirecting to login page...');
            // 示例中使用 Vue Router 进行导航
            // this.$router.push('/login');
        }

        return config;
    }
)
//响应拦截器

export default httpInstance