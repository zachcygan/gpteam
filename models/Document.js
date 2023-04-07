const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Document extends Model {}

Document.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        bucket_link: {
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
                model: 'users',
                key: 'id',
            }
        },

     },
    {
        sequelize,
        timestamps: false,
        freeseTableName: true,
        underscored: true,
        modelName: 'document'
    }
);

module.exports = Document;