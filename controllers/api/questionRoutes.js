const router = require('express').Router();
const { User, Question, Comment } = require('../../models')

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
});

router.get('/:id', async (req, res) => {
    try {
        const questionData = await Document.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        })

        const question = questionData.get({ plain: true })


    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Comment.destroy({
            where: {
                question_id: req.params.id
            }
        });

        const postData = await Question.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        })

        if (!postData) {
            req.status(400).json({ message: 'No post found with that id' });
            return;
        }

        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;