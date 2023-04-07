const router = require('express').Router();
const { Document, Comment } = require('../../models')

router.post('/', async (req, res) => {
    try {
        const newDocPost = await Document.create({
            ...req.body,
            user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Comment.destroy({
            where: {
                document_id: req.params.id 
            }
        });

        const docData = await Document.destroy({
            where: {
                id: req.params.id,
                user_id: res.session.user_id
            },
        });

        if (!docData) {
            res.status(400).json({ message: 'No document post found with this id' })
            return;
        }

        res.status(200).json(docData);
        
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;