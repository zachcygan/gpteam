const router = require('express').Router();
const { Question, Comment } = require('../../models')

router.post('/', async (req, res) => {
    try {  
        const newPost = await Question.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;