const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const data = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          as: 'comments',
          include: {
            model: User,
            attributes: ['name'],
          },
        },
      ],
      order: [['id', 'DESC']],
    });
    let postData = data.map((post) => post.toJSON());
    postData.forEach((post) => {
      if (post.userId === req.session.user_id) post.myPost = true;
      post.comments.forEach((comment) => {
        if (comment.userId === req.session.user_id) comment.myComment = true;
      });
    });

    res.render('homepage', {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      postData,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const user = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      raw: true,
    });

    const postData = await BlogPost.findAll({
      where: { userId: user.id },
      raw: true,
    });

    res.render('dashboard', {
      ...user,
      postData,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newPost', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const user = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      raw: true,
    });

    res.render('newPost', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/editPost/:postId', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const user = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      raw: true,
    });
    const { postId } = req.params;
    const post = await BlogPost.findByPk(postId, { raw: true });

    user.id === post?.userId
      ? res.render('editPost', {
          user,
          post,
          logged_in: true,
        })
      : res.redirect('/');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/comment/:postId', withAuth, async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await BlogPost.findByPk(postId, { raw: true });

    res.render('comment', {
      ...post,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/editComment/:commentId', withAuth, async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId, { raw: true });
    const post = await BlogPost.findByPk(comment.blogPostId, { raw: true });

    res.render('editComment', {
      ...post,
      comment,
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
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
