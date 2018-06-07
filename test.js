const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db');
const User = conn.define('user', {});

const expect = require('chai').expect;

describe('my app', ()=> {
  beforeEach(()=> {
    return conn.sync({ force: true });
  });
  it('works', ()=> {
    expect(true).to.equal(true);
  });
});
