//http://gmall-h5-api.atguigu.cn

import axios from "axios";
import cart from "@/store/cart";
import user from '@/store/user'

const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
});

requests.interceptors.request.use((config)=>{
    if (cart.state.uuidToken) {
        config.headers.usertempId = cart.state.uuidToken
    }
    if (user.state.token) {
        config.headers.token = user.state.token
    }
    return config
})
requests.interceptors.response.use((res)=>{
    return res.data
},(rej)=>{
    return Promise.reject(new Error('error'))
})

export default requests