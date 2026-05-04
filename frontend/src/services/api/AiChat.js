import { api } from "../axios";

export default class AiChat
{
     static async chat(msg)
     {
          try {
               const res = await api.post("/aichat",{prompt : msg});

               if(!res.success){
                    throw new Error(res.message || "AI failed to respond");
               }
               return res.message;
          }

          catch (e){
               throw e;
          }
     }
}