const User = require('./User');
const Document = require('./Document');
const Comment = require('./Comment');

User.hasMany(Document, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Document.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
 });


Comment.belongsTo(Document, {
  foreignKey: 'document_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Document.hasMany(Comment, {
  foreignKey: 'document_id',
});


module.exports = { User, Document, Comment };