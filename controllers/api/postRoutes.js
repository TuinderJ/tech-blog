const router = require('express').Router();
const { BlogPost, User } = require('../../models');

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
    console.log(postData);
    res.json(postData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { userId, title, post } = req.body;
    const data = await BlogPost.create({ userId, title, post });

    res.status(200).json(data);
  } catch (err) {
    console.log('error', err);
    res.status(500).json(err);
  }
});

router.put('/:postId', async (req, res) => {
  try {
    const { userId, title, post } = req.body;
    const { postId } = req.params;
    const data = await BlogPost.update(
      { userId, title, post },
      { where: { id: postId } }
    );
    data[0] ? res.status(200).json(data) : res.status(400).json('bad request');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const data = await BlogPost.destroy({ where: { id: postId } });
    console.log(data);
    data ? res.status(200).json(data) : res.status(400).json('bad request');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
