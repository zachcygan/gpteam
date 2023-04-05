const chatButton = $('#chatButton');
const chatWindow = $('#chatWindow');
const closeChat = $('#closeChat');
const chatInput = $('#chatInput');
const chatForm = $('#chatForm');
const chatMessages = $('#chatMessages');

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

    const userChat = $('<p>');
    const chatResponse = $('<p>');  

    userChat.text(chatInput.val());

    const chatStart = $('<div>')
    const chatEnd = $('<div>')

    chatEnd.addClass(['chat', 'chat-end'])
    chatStart.addClass(['chat', 'chat-start'])

    chatResponse.addClass('chat-bubble');
    userChat.addClass(['chat-bubble']);

    chatEnd.append(userChat);
    chatStart.append(chatResponse);
    chatMessages.append(chatEnd);

    chatInput.val('');
    scrollToBottom();
})

const scrollToBottomm = () => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


