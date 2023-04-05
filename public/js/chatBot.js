const chatButton = $('#chatButton');
const chatWindow = $('#chatWindow');
const closeChat = $('#closeChat');
console.log(chatButton.text())

chatButton.on('click', () => {
    chatWindow.removeClass('hidden');
    chatButton.addClass('hidden');
});

closeChat.on('click', () => {
    chatWindow.addClass('hidden');
    chatButton.removeClass('hidden');
});