import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'http://localhost:3000'
 })

// Request Interceptor
axiosInstance.interceptors.request.use((config)=>{
   const token = localStorage.getItem('token')
   if(token){
      config.headers.set('Authorization','Bearer ' +token)
   }
   return config
},(Error)=>{
   return Promise.reject(Error)
})

export default axiosInstance