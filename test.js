const db = require('./db');

const { models } = db;

const expect = require('chai').expect;

describe('my app', ()=> {
  beforeEach(()=> {
    return db.syncAndSeed();
  });

  let moe;

  beforeEach(()=> {
    return models.User.findOne({
      where: { name: 'moe' },
      include: [
        {
          model: models.Apartment,
          include: [
            models.Building
          ]
        }
      ]
    })
    .then( _moe => moe = _moe );
  });

  it('works', ()=> {
    expect(true).to.equal(true);
  });
  describe('moe', ()=> {
    it('has two apartments', ()=> {
      expect(moe.apartments.length).to.equal(2);
      const buildings = moe.apartments.map( apartment => apartment.building.name );
      expect(buildings).to.contain('10 cpw');
      expect(buildings).to.contain('5th Avenue');
    });
  });
});
