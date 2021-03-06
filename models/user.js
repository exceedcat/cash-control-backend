const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    login: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
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
    User.hasMany(models.spending, { as: 'spendings' })
  };

  return User;
};

export default user;