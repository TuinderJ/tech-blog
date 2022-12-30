const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const userId = req.session.user_id;
    const blogPostId = Number(req.body.postId);
    const comment = req.body.comment;

    const data = await Comment.create({ userId, blogPostId, comment });

    res.status(200).json(data);
  } catch (err) {
    console.log('error', err);
    res.status(500).json(err);
  }
});

router.put('/:commentId', withAuth, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;
    const data = await Comment.update(
      { comment },
      { where: { id: commentId } }
    );
    data[0] ? res.status(200).json(data) : res.status(400).json('bad request');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const data = await Comment.destroy({ where: { id: commentId } });
    data ? res.status(200).json(data) : res.status(400).json('bad request');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
