var monk = require('monk');
var should = require('should');

describe('monk connection and initialization', function () {
  it('is easy to connect', function (done) {
    var db = monk('mongodb://localhost/amherstscrutiny');
    should.exists(db);
    done();
  });

  it('is easy to get hold of collection', function (done) {
    var db = monk('mongodb://localhost/amherstscrutiny');
    var collection = db.get('reviews');
    should.exists(collection);
    done();
  });
});