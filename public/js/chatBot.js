const chatButton = $('#chatButton');
const chatWindow = $('#chatWindow');
const closeChat = $('#closeChat');
const chatInput = $('#chatInput');
const chatForm = $('#chatForm');
const chatMessages = $('#chatMessages');
const userChat = $('<p>');
const botChat = $('<p>');

chatButton.on('click', () => {
    chatWindow.removeClass('hidden');
    chatButton.addClass('hidden');
});

closeChat.on('click', () => {
    chatWindow.addClass('hidden');
    chatButton.removeClass('hidden');
});

chatForm.on('submit', (event) => {
    event.preventDefault();
    userChat.text(chatInput.val());

    const chatStart = $('<div>')
    const chatEnd = $('<div>')

    chatEnd.addClass(['chat', 'chat-end'])
    chatStart.addClass(['chat', 'chat-start'])

    userChat.addClass('chat-bubble');

    chatEnd.append(userChat)
    chatMessages.append(chatEnd);
})


