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

  Users.associate = (models) => {
    Users.belongsToMany(models.Spending, {
      through: 'SpendingUsers',
      as: 'spendings',
      foreignKey: 'userId'
    });
  };

  return User;
};

export default user;