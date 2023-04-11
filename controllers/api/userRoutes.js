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
            req.session.errorMessage = 'Incorrect email or password, please try again'
            res.redirect('/login')
            return;
        }

        const correctPassword = userData.checkPassword(req.body.password);

        if (!correctPassword) {
            req.session.errorMessage = 'Incorrect email or password, please try again'
            res.redirect('/login')
            return;
        }

        req.session.user_id = userData.id;
        req.session.logged_in = true;
        req.session.avatar_link = userData.avatar_link;
        res.redirect('/')

    } catch (err) {
        req.session.errorMessage = err.message;
        res.redirect('/login')
    }
});

router.post('/register', async (req, res) => {
    try {
        const userData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        res.redirect('/login');
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/logout', (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy();
            res.redirect('/')
        } else {
            res.status(404).end()
        }
    } catch (err) {
        res.status(500).json(err)
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