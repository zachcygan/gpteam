const User = require('./User');
const Document = require('./Document');
const Comment = require('./Comment');

User.hasMany(Document, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Document.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
 });


Comment.belongsTo(Document, {
  foreignKey: 'document_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Document.hasMany(Comment, {
  foreignKey: 'document_id',
  onDelete: 'CASCADE'
});


module.exports = { User, Document, Comment };