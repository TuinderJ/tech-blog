const router = require('express').Router();
const sequelize = require('sequelize');
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await BlogPost.findAll({
      raw: true,
      include: {
        model: User,
        attributes: {
          include: 'name',
          exclude: ['id', 'email', 'password'],
        },
      },
    });
    postData.forEach((post) => {
      if (post.userId === req.session.user_id) post.myPost = true;
    });
    console.log(postData);
    res.render('homepage', {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      postData,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  console.log('hi');
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  console.log('hi');
  res.render('signup');
});

module.exports = router;
