const router = require('express').Router();
const { Document } = require('../../models');
const withAuth = require('../../util/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const docData = await Document.findAll({
            where: {
                career_field: req.params.career_field
            },
        });
        if (!docData) {
            res.status(400).json({ message: 'Career field not found' })
            return;
        }
        res.status(200).json(docData);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;