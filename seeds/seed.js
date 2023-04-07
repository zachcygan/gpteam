const sequelize = require('../config/connection');
const { User, Question } = require('../models');

const userData = require('./userData.json');
const questionData = require('./questionData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const question of questionData) {
    await Question.create({
      ...question,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();