const chatButton = $('#chatButton');
const chatWindow = $('#chatWindow');
const closeChat = $('#closeChat');
const chatInput = $('#chatInput');
const chatForm = $('#chatForm');
const chatMessages = $('#chatMessages');
const botResponding = $('#botResponding')
const resetBot = $('#resetBot')

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

    userChat.text(chatInput.val());

    const chatStart = $('<div>')
    const chatEnd = $('<div>')

    chatEnd.addClass(['chat', 'chat-end'])

    chatStart.addClass(['chat', 'chat-start'])

    userChat.addClass(['chat-bubble']);

    chatEnd.append(userChat);
    chatMessages.append(chatEnd);

    fetchBotResponse(chatInput.val())

    chatInput.val('');
    botResponding.removeClass('hidden')
    
    scrollToBottom();
})

const scrollToBottom = () => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

const fetchBotResponse = async (userMessage) => {
    try {
        const response = await fetch('/openAI/botResponse', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userMessage })
        });

        if (!response.ok) {
            console.log('ERROR FETCHING AI RESPNOSE')
        }

        const data = await response.json();

        const chatResponse = $('<div>');
        const botResponse = $('<p>');

        chatResponse.addClass(['chat', 'chat-start']);
        botResponse.addClass(['chat-bubble'])

        botResponse.text(data.message)

        chatResponse.append(botResponse);
        chatMessages.append(chatResponse);

        botResponding.addClass('hidden')
    } catch (err) {
        console.log(err)
    }
}

const resetConversation = () => {
    conversationHistory = [];
    chatMessages.empty();
};

resetBot.on('click', () => {
    resetConversation();
})

