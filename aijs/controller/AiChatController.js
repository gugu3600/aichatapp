import ollama from "ollama";

export class AiChatController 
{
     static async getMessages(req,res) 
     {
          const {prompt} = req.body;

          try { 
               const aiRes = await ollama.chat({
                    model: "qwen2.5-coder:latest",
                    messages : [{role : "user", content : prompt}]
               });

               // console.log("message :" + aiRes.message.content);
               return res.status(200).json({status:200,success:true,message : aiRes.message.content});
          }

          catch (e){ 
               console.log("Internal Server Error");
               return res.status(500).json({status:500,success : false, message: "Internal Server Error"});
          }
     }
}