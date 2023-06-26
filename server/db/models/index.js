import Sequelize from 'sequelize-cockroachdb';

import configs from '../config/config.json';
import Poll from './poll';
import PollOption from './pollOption';
import User from './user';

console.log('POLL', Poll)
const env = process.env.NODE_ENV || 'development';
const config = configs[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

const db = {
  Poll: Poll(sequelize, Sequelize.DataTypes),
  PollOption: PollOption(sequelize, Sequelize.DataTypes),
  User: User(sequelize, Sequelize.DataTypes),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
