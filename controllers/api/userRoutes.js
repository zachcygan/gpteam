const router = require('express').Router();
const { User, Comment, Document, Question } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData)
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const correctPassword = await userData.checkPassword(req.body.password);

        if (!correctPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again'})
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.redirect('/')
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/register', async (req, res) => {
    try {
        const userData = await User.create({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        res.redirect('/login');
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end()
    }
});

router.post('/comment', async (req, res) => {
    try {
        const commentData = await Comment.create({
            content: req.body.content,
            post_id: req.session.post_id,
            user_id: req.session.user_id
        })

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;