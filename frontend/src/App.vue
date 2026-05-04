<script setup>
import AiChat from './services/api/AiChat';
import { ref, nextTick } from 'vue';

const messages = ref([]);
const prompt = ref("");
const loading = ref(false);
const scrollRef = ref(null);

const scrollToBottom = async () => {
     // await nextTick();
     if (scrollRef.value) {
          scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
     }
};

const handlePrompt = async () => {
     if (!prompt.value.trim() || loading.value) return;

     const userText = prompt.value;

     // 1. Add User message
     messages.value.push({ role: 'user', text: userText });
     prompt.value = "";
     loading.value = true;
     scrollToBottom();

     try {
          // 2. Call API
          const res = await AiChat.chat(userText);

          // 3. Add AI message
          messages.value.push({ role: 'ai', text: res });
     } catch (e) {
          console.error(e);
          messages.value.push({ role: 'error', text: "Failed to get response. Try again." });
     } finally {
          loading.value = false;
          scrollToBottom();
     }
}
</script>

<template>
     <div class="flex flex-col h-screen max-w-5xl mx-auto border-x border-gray-100 bg-dark shadow-2xl">

          <header
               class="flex items-center justify-between px-6 py-4 border-b bg-white/80 backdrop-blur-md sticky top-0 z-20">
               <div class="flex items-center gap-3">
                    <div class="relative">
                         <div
                              class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                              <span class="font-bold text-xs">QW</span>
                         </div>
                         <div
                              class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full">
                         </div>
                    </div>
                    <div>
                         <h1 class="font-bold text-gray-800 leading-tight">Qwen Coder</h1>
                         <p class="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Local Ollama
                              Instance</p>
                    </div>
               </div>
          </header>

          <main ref="scrollRef" class="flex-1 overflow-y-auto p-6 space-y-6 bg-[#111827] scroll-smooth">
               <div v-if="messages.length === 0"
                    class="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div class="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                         <p class="text-gray-400 text-sm italic">How can I help you code today?</p>
                    </div>
               </div>

               <div v-for="(message, index) in messages" :key="index"
                    class="flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300"
                    :class="message.role === 'user' ? 'justify-end' : 'justify-start'">
                    <div :class="[
                         'max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all',
                         message.role === 'user'
                              ? 'bg-indigo-600 text-white rounded-tr-none'
                              : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none',
                         message.role === 'error' ? 'bg-red-50 text-red-600 border-red-200' : ''
                    ]">
                         <div class="whitespace-pre-wrap">{{ message.text }}</div>

                         <div class="mt-1 text-[10px] opacity-50 flex justify-end"
                              :class="message.role === 'user' ? 'text-white' : 'text-gray-400'">
                              {{ new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                         </div>
                    </div>
               </div>

               <div v-if="loading" class="flex justify-start items-center gap-3">
                    <div class="bg-[#111827] border border-gray-200 px-4 py-4 rounded-2xl rounded-tl-none shadow-sm">
                         <div class="flex gap-1.5">
                              <div class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-duration:800ms]">
                              </div>
                              <div
                                   class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-duration:800ms] [animation-delay:200ms]">
                              </div>
                              <div
                                   class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-duration:800ms] [animation-delay:400ms]">
                              </div>
                         </div>
                    </div>
               </div>
          </main>

          <footer class="p-6 bg-[#111827] border-t border-gray-100">
               <form @submit.prevent="handlePrompt" class="relative max-w-4xl mx-auto flex gap-3">
                    <div class="relative flex-1 bg-[#111827]">
                         <input v-model="prompt" :disabled="loading" type="text"
                              placeholder="Describe your project or ask a question..."
                              class="w-full pl-4 pr-12 py-4 bg-[#111827] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-50" />
                    </div>

                    <button type="submit" :disabled="loading || !prompt.trim()"
                         class="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white p-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 active:scale-95">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 rotate-90" fill="none"
                              viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                   d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                         </svg>
                    </button>
               </form>
               <p class="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest">
                    Running Qwen 2.5 Coder via Ollama
               </p>
          </footer>
     </div>
</template>

<style scoped>
/* Custom scrollbar for better look */
main::-webkit-scrollbar {
     width: 6px;
}

main::-webkit-scrollbar-track {
     background: transparent;
}

main::-webkit-scrollbar-thumb {
     background: #e2e8f0;
     border-radius: 10px;
}

main::-webkit-scrollbar-thumb:hover {
     background: #cbd5e1;
}

/* Animations */
.animate-in {
     animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
     from {
          opacity: 0;
          transform: translateY(10px);
     }

     to {
          opacity: 1;
          transform: translateY(0);
     }
}
</style>