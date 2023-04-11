const { User } = require('../models');

// attaches the user avatar_link to the res.locals so it is accessible
module.exports = async function attachData(req, res, next) {
    if (req.session.logged_in) {
        try {
            const userData = await User.findByPk(req.session.user_id, {
                attributes: ['avatar_link']
            })

            if (userData) {
                res.locals.avatar_link = userData.avatar_link
            }
        } catch (err) {
            console.log(err)
        }
    } 
    next();
};