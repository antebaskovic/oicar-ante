const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);
chai.should();

describe("Other", () => {
  describe("/GET myusers", () => {
    const trainerId = 2;  
    const nonTrainerId = 1;  
  
    it("it should GET all the users by the trainer", (done) => {
      const token = jwt.sign({ userId: trainerId, email: 'trainer@test.com', role: 'Trainer' }, 'your_secret_key');
  
      chai.request(app)
        .get("/myusers")
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1); 
          done();
        });
    });
  
    it("it should not allow non-trainers to GET the users", (done) => {
      const token = jwt.sign({ userId: nonTrainerId, email: 'user@test.com', role: 'User' }, 'your_secret_key');
  
      chai.request(app)
        .get("/myusers")
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
});

