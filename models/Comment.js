const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        document_id: {
            type: DataTypes.INTEGER,
            references: {
                model:'documents',
                key: 'id',
            } 
        },
        question_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'documents',
                key: 'id'
            }
        }

    },
    {
        sequelize,
        timestamps: false,
        freeseTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;