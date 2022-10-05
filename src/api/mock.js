import axios from "axios";

const mockRequests = axios.create({
    baseURL: '/mock',
    timeout: 5000
});

mockRequests.interceptors.request.use((config)=>{
    return config
})
mockRequests.interceptors.response.use((res)=>{
    return res.data
},(rej)=>{
    return Promise.reject(new Error('error'))
})

export default mockRequests