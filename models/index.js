const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

User.hasMany(BlogPost);
BlogPost.belongsTo(User);
BlogPost.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(BlogPost);

module.exports = { User, BlogPost, Comment };
