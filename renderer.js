/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

let modelLoaded = false;

const selectedModelDiv = document.getElementById('selected-model');
const selectAndLoadBtn = document.getElementById('select-and-load-btn');
const modelStatus = document.getElementById('model-status');
const chatInterface = document.getElementById('chat-interface');
const messagesDiv = document.getElementById('messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const huggingfaceLink = document.getElementById('huggingface-link');

huggingfaceLink.addEventListener('click', async (e) => {
  e.preventDefault();
  await window.electronAPI.openExternalLink('https://huggingface.co/MaziyarPanahi/Meta-Llama-3-8B-Instruct-GGUF/tree/main');
});

selectAndLoadBtn.addEventListener('click', async () => {
  try {
    selectAndLoadBtn.disabled = true;
    modelStatus.textContent = 'Selecting file...';
    
    const filePath = await window.electronAPI.selectGgufFile();
    if (!filePath) {
      modelStatus.textContent = 'No file selected';
      return;
    }
    
    const fileName = filePath.split('/').pop();
    selectedModelDiv.textContent = `Selected: ${fileName}`;
    
    modelStatus.textContent = 'Loading model...';
    // @electron/llm
    await window.electronAi.create({
      modelAlias: filePath,
      systemPrompt: 'You are a helpful assistant.'
    });
    
    modelLoaded = true;
    modelStatus.textContent = 'Model loaded successfully! Ready to chat.';
    chatInterface.style.display = 'block';
    selectAndLoadBtn.textContent = 'Change Model';
    
  } catch (error) {
    modelStatus.textContent = `Error: ${error.message}`;
    console.error('Error:', error);
  } finally {
    selectAndLoadBtn.disabled = false;
  }
});

function addMessage(text, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.style.margin = '10px 0';
  messageDiv.style.padding = '10px';
  messageDiv.style.borderRadius = '5px';
  messageDiv.style.backgroundColor = isUser ? '#e3f2fd' : '#f5f5f5';
  messageDiv.innerHTML = `<strong>${isUser ? 'You' : 'AI'}:</strong> ${text}`;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

sendBtn.addEventListener('click', async () => {
  if (!modelLoaded) {
    alert('Please load a model first');
    return;
  }
  
  const message = chatInput.value.trim();
  if (!message) return;
  
  addMessage(message, true);
  chatInput.value = '';
  sendBtn.disabled = true;
  
  const responseDiv = document.createElement('div');
  responseDiv.style.margin = '10px 0';
  responseDiv.style.padding = '10px';
  responseDiv.style.borderRadius = '5px';
  responseDiv.style.backgroundColor = '#f5f5f5';
  responseDiv.innerHTML = '<strong>AI:</strong> ';
  messagesDiv.appendChild(responseDiv);
  
  try {
    // @electron/llm
    const stream = await window.electronAi.promptStreaming(message, {});
    let fullResponse = '';
    
    for await (const chunk of stream) {
      fullResponse += chunk;
      responseDiv.innerHTML = `<strong>AI:</strong> ${fullResponse}`;
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  } catch (error) {
    responseDiv.innerHTML = `<strong>AI:</strong> Error: ${error.message}`;
    console.error('Streaming error:', error);
  } finally {
    sendBtn.disabled = false;
  }
});

chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendBtn.click();
  }
});