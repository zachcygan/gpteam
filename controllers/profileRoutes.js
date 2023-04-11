const router = require('express').Router();
const { User, Document, Question, Comment } = require('../models');
const withAuth = require('../util/auth');

router.get('/', async (req, res) => {
    try{
    //     const documentData = await Document.findAll({
    //         where: {
    //             user_id: req.session.user_id
    //         },
    //         attributes: ['id', 'bucket_link', 'date_uploaded', 'career_field', 'user_id'],
    //         include: [{
    //             model: User,
    //             attributes: ['name'],
    //         }]
    //     })
    //     const questionData = await Question.findAll({
    //         where: {
    //             user_id: req.session.user_id
    //         },
    //         attributes: ['id', 'question_text', 'date_uploaded', 'career_field', 'user_id'],
    //         include: [{
    //             model: User,
    //             attributes: ['name'],
    //         }]

    //     })
    //     const documents = documentData.map((document) => document.get({plain:true}));
    //     const questions = questionData.map((question) => question.get({plain:true}));
        res.render('profile', {
    })
}catch (err) {
    res.status(500).json(err)
}
});

router.get('/user/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Document },
                { model: Question }
            ],
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        const user = userData.get({ plain: true });

        res.render('userprofile', {
            user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router; 