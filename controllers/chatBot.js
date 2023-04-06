require('dotenv').config();
const router = require('express').Router();
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)
const converationHistory = [];

router.post('/botResponse', async (req, res) => {
    try {
        const userMessage = req.body.userMessage;

        const response = await botResponse(userMessage)
        res.status(200).json({ message: response })
    } catch {
        res.status(500).json(err)
    }
})

const botResponse = async (userMessage) => {
    converationHistory.push({
        role: 'user',
        content: userMessage
    })

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: converationHistory
    })

    const botMessage = response.data.choices[0].message.content.trim();
    converationHistory.push({
        role: 'assistant',
        content: botMessage
    })

    return botMessage;
}

module.exports = router;