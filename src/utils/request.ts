import axios from 'axios'
// 创建axios实例
const service = axios.create({
    baseURL:import.meta.env.VITE_NAME,
    timeout:5000,
    headers:{
        "Content-Type":"application/x-www-form-urlencoded;charset=utf-8"
    }
})
// 请求拦截
service.interceptors.request.use(
    config => {
        config.headers = config.headers || {}
        if (localStorage.getItem('token')) {
            config.headers.token = localStorage.getItem('token') || ''
        }
        return config
    }
)

//响应拦截
service.interceptors.response.use(
    response => {
        const code: number = response.data.code
        if (code != 200) {
            return Promise.reject(response.data)
        }
        return response.data
    },(error) => {
        console.log(error)
    }
)
export default service

