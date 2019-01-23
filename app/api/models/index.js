import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL);

const models = {
  User: sequelize.import('./user'),
  Spending: sequelize.import('./spending'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;