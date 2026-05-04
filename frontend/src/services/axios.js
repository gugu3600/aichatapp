import axios from "axios";

export const api = axios.create({
     baseURL : import.meta.env.VITE_APP,
     headers : {
          "Content-Type" : "application/json",
          "Accept" : "application/json"
     }
});

api.interceptors.response.use(

     res => res.data,

     (error) => {
          // LOGIC: Handle specific status codes
          if (error.response) {
               console.error("Backend Error:", error.response.data);

               if (error.response.status === 401) {
               }
          } else if (error.request) {
               console.error("Network Error: No response received");
          }

         
          return Promise.reject(error);
     }
)