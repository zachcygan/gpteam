const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Question extends Model {}

Question.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        question_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date_uploaded: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
        career_field: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
     },
    {
        sequelize,
        timestamps: false,
        freeseTableName: true,
        underscored: true,
        modelName: 'question'
    }
);

module.exports = Question;