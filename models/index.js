const User = require('./User');
const Document = require('./Document');
const Comment = require('./Comment');
const Question = require('./Question');

User.hasMany(Document, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Question, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Document.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
 });

Question.belongsTo(User, {
  foreignKey: 'user_id',
})

Comment.belongsTo(Document, {
  foreignKey: 'document_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Document.hasMany(Comment, {
  foreignKey: 'document_id',
});

Question.hasMany(Comment, {
    foreignKey: 'question_id',
});

module.exports = { User, Document, Comment, Question };