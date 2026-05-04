import ollama from 'ollama';

async function runAI() {
     try {
          const response = await ollama.chat({
               model: 'qwen2.5-coder:latest',
               messages: [{ role: 'user', content: 'how to setup express and vue for qwen2.5 ai from localmodel ?' }],
          });

          console.log("Qwen Response:", response.message.content);
     } catch (error) {
          console.error("Error:", error.message);
     }
}

runAI();