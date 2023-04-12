const router = require('express').Router();
const { User, Document } = require('../models');
const withAuth = require('../util/auth');

//get all documents with user id equal to user from session data
router.get('/', withAuth, async (req, res) => {
    try{
        const documentData = await Document.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{
                model: User,
            }]
        });
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'], include: ['bio'] },
            include: [{ model: Document }]
          })
      
          const user = userData.get({ plain: true })
        const documents = documentData.map((document) => document.get({plain:true}));
        console.log({documents});
        res.render('profile', {
            user,
            documents,
            logged_in: req.session.logged_in
    });
}catch (err) {
    res.status(500).json(err);
}
});

//gets all document data from user with the same id as selected from a post on the DOM aka views other user profiles
router.get('/user/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Document },
            ],
        });

        const docData = await Document.findAll({
            where: {
                user_id: req.params.id
            }
        })

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        const documents = docData.map((document) => document.get({ plain: true }));
        const user = userData.get({ plain: true });

        res.render('userprofile', {
            user,
            documents,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router; 