const chatButton = document.getElementById('chat-button');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');

chatButton.addEventListener('click', () => {
    chatWindow.classList.remove('hidden');
    chatButton.classList.add('hidden');
});

closeChat.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
    chatButton.classList.remove('hidden');
});