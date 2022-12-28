const User = require('./User');
const BlogPost = require('./BlogPost');

User.hasMany(BlogPost);
BlogPost.belongsTo(User);

module.exports = { User, BlogPost };
