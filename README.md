# Minimal chat app using electron/llm

A minimal electron app using [@electron/llm](https://github.com/electron/llm) to demonstrate local AI chat functionality. Clone this repo to and follow the steps below to see it in action. 

While this isn't a bare-bones minimal repro, it's as minimal as I could make it while keeping it presentable. I've left comments `@electron/llm` wherever we utilize the [@electron/llm](https://github.com/electron/llm) API so it's easier for your reference.

```ts
// @electron/llm
await window.electronAi.create({
   modelAlias: filePath,
   systemPrompt: 'You are a helpful assistant.'
});
```


<img src="https://github.com/user-attachments/assets/046c4420-afde-46c1-9377-14502ff61d96" alt="Demo GIF" width="700">

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the app**
   ```bash
   npm start
   ```

3. **Get a model**
   - Download any GGUF model from [Hugging Face](https://huggingface.co/models?library=gguf)
   - Recommended: [Meta-Llama-3-8B-Instruct-GGUF](https://huggingface.co/MaziyarPanahi/Meta-Llama-3-8B-Instruct-GGUF/tree/main)

4. **Use the app**
   - Click "Load Model"
   - Choose your GGUF file
   - Start chatting

## Requirements

- Node.js (v18+)
- 4-8GB RAM (depending on model size)
