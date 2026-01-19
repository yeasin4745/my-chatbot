async function sendRequest() {
    const input = document.getElementById('promptInput');
    const display = document.getElementById('display');
    const sendBtn = document.getElementById('sendBtn');
    const userMessage = input.value.trim();

    if (!userMessage) {
        alert('অনুগ্রহ করে একটি মেসেজ লিখুন!');
        return;
    }

    display.innerHTML += `<div class="message user-message"><b>You:</b> ${userMessage}</div>`;
    input.value = '';
    sendBtn.disabled = true;

    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'loading';
    loadingMsg.textContent = 'AI চিন্তা করছে...';
    display.appendChild(loadingMsg);
    display.scrollTop = display.scrollHeight;

    try {
        const response = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ prompt: userMessage })
        });

        const data = await response.json();
        loadingMsg.remove();

        if (response.ok) {
            display.innerHTML += `<div class="message ai-message"><b>AI:</b> ${data.content}</div>`;
        } else {
            display.innerHTML += `<div class="message error"><b>Error:</b> ${data.error}</div>`;
        }

    } catch (error) {
        loadingMsg.remove();
        display.innerHTML += `<div class="message error"><b>Error:</b> ${error.message}</div>`;
    }

    sendBtn.disabled = false;
    display.scrollTop = display.scrollHeight;
}
