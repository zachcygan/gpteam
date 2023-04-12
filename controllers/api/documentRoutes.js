const router = require('express').Router();
const { Document, Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newDocPost = await Document.create({
            ...req.body,
            user_id,
        });

        res.status(200).json(newDocPost);
    } catch (err) {
        res.status(500).json(err)
    }
});


router.delete('/:id', async (req, res) => {
    try { 
        const docData = await Document.destroy({
            //deletes the "document" from the database with the associated id (documents are now documents and text posts combined)
            where: {
                id: req.params.id
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