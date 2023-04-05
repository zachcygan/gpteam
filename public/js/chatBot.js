require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const chatButton = $('#chatButton');
const chatWindow = $('#chatWindow');
const closeChat = $('#closeChat');
const chatInput = $('#chatInput');
const chatForm = $('#chatForm');
const chatMessages = $('#chatMessages');
const userChat = $('<p>');
const chatResponse = $('<p>');
const converationHistory = [];

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

    chatResponse.addClass('chat-bubble');
    userChat.addClass('chat-bubble');

    chatEnd.append(userChat);
    chatStart.append(chatResponse);
    chatMessages.append(chatEnd);
})


