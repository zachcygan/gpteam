const router = require('express').Router();
const { User, Document, Comment } = require('../models');
const withAuth = require('../util/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const documentData = await Document.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'avatar_link'],
                },
                {
                    model: Comment,
                    attributes: ['comment_text'],
                },
            ],
            order: [[
                'date_uploaded', 'DESC'
            ]]
        });

        const documents = documentData.map((document) => document.get({ plain: true }));


        res.render('postpage', {
            documents,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/document/:id', async (req, res) => {
    try {
        const documentData = await Document.findByPk(req.param.id, {
            include: [
                {
                    model: User, Comment,
                },
            ],
        });
        const document = documentData.get({ plain: true });

        res.render('document', {
            ...document,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/question/:id', async (req, res) => {
    try {
        const documentData = await Document.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ['comment_text', 'user_id'],
                    include: [{model: User}],
                },

            ],
        });
        const document = documentData.get({ plain: true });

        console.log(document);

        res.render('individual', {
            ...document,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/user', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Document },
            ],
        });
        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/blog');
        return;
    }
    res.render('login');
});


router.post('/', withAuth, async (req, res) => {
    try {
        const newDocument = await Document.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newDocument);
    } catch (err) {
        res.status(400).json(err);
    }
});


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const documentData = await Document.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!documentData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(documentData);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;



