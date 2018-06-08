const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db');

const User = conn.define('user', {
  name: Sequelize.STRING
});

const Building = conn.define('building', {
  name: Sequelize.STRING
});

const Apartment = conn.define('apartment', {
  name: Sequelize.STRING
});

Apartment.belongsTo(User);
Apartment.belongsTo(Building);
User.hasMany(Apartment);

const db = {
  models: {
    Apartment,
    Building,
    User
  },
  syncAndSeed: ()=> {
    let moe, fifthAve, cpw;
    return conn.sync({ force: true })
      .then(()=> Promise.all([
        User.create({ name: 'moe' }),
        Building.create({ name: '5th Avenue' }),
        Building.create({ name: '10 cpw' }),
      ]))
      .then(([_moe, _fifthAvenue, _cpw])=> {
        moe = _moe;
        fifthAvenue = _fifthAvenue;
        cpw = _cpw;
        return Promise.all([
          Apartment.create({ buildingId: fifthAvenue.id, userId: moe.id }),
          Apartment.create({ buildingId: cpw.id, userId: moe.id })
        ]);
      })
  }
};

module.exports = db;
