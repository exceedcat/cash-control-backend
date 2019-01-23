const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  User.associate = (models) => {
    User.belongsToMany(models.Spending, {
      through: 'SpendingUser',
      as: 'spendings',
      foreignKey: 'userId'
    });
  };

  return User;
};

export default user;