import axios from 'axios'

export const AxiosInterceptor = ()=> {

    const token= '1234'
    axios.interceptors.request.use((request)=>{
        const newHeaders = {
            Authorization: token, 
            "Content-Type":"application/json",
        }
        request.headers = newHeaders
        return request
    }, (error)=>{console.log(error)})

    axios.interceptors.response.use(
        (response)=>{ 
        return response;
    }, (error) => {console.log(error)})
}
