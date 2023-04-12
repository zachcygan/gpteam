const router = require('express').Router();
const { User, Document, Comment } = require('../models');
const withAuth = require('../util/auth');

//this loads all posts/documents from all users on the post page and lists them from newest to oldest
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
             //lists the document posts from newest to oldest
            order: [[
                'date_uploaded', 'DESC'
            ]],
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

//this endpoint grabs all posts from all users with the specified industry filer (career field) and posts them to the page from newest to oldest
router.get('/:industry', withAuth, async (req, res) => {

    try {
        console.log(req.params.industry, 'test');
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
            //specifies which careerfield to load posts from
            where: {
                career_field: req.params.industry
            },
            //lists the document posts from newest to oldest
            order: [[
                'date_uploaded', 'DESC'
            ]],
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



