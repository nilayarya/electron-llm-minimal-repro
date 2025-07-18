# Minimal Repro - Electron LLM Chat

A minimal reproduction of an Electron app using [@electron/llm](https://github.com/electron/llm) to demonstrate local AI chat functionality.

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
