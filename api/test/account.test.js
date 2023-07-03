const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../app');
const { expect } = chai;

chai.use(chaiHttp);

describe("Account", () => {
  describe("/GET /account", () => {
    it("it should GET account details for a user role", (done) => {
      // Create a JWT for testing
      const token = jwt.sign({ userId: 1, email: 'user@test.com', role: 'User' }, 'your_secret_key', { expiresIn: '1h' });
  
      chai.request(app)
        .get('/account')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('userDetails');
          done();
        });
    });
  
    it("it should GET account details for a trainer role", (done) => {
      // Create a JWT for testing
      const token = jwt.sign({ userId: 2, email: 'trainer@test.com', role: 'Trainer' }, 'your_secret_key', { expiresIn: '1h' });
  
      chai.request(app)
        .get('/account')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('trainerDetails');
          done();
        });
    });
  
    it("it should return 404 if the user does not exist", (done) => {
      const token = jwt.sign({ userId: 999, email: 'randomuser@test.com', role: 'User' }, 'your_secret_key', { expiresIn: '1h' });
  
      chai.request(app)
        .get('/account')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  
    it("it should return 403 if the token is invalid", (done) => {
      const token = 'invalid-token';
  
      chai.request(app)
        .get('/account')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });
  });
  
  describe("/PUT /account", () => {
    it("it should update account details for a user role", (done) => {
      const token = jwt.sign({ userId: 1, email: 'user@test.com', role: 'User' }, 'your_secret_key', { expiresIn: '1h' });
  
      const requestBody = {
        firstName: 'John',
        lastName: 'Doe',
        height: '180',
        weight: '80',
        age: '25',
        gender: 'male',
        miscellaneousLimits: 'None'
      };
  
      chai.request(app)
        .put('/account')
        .set('Authorization', 'Bearer ' + token)
        .send(requestBody)
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  
    it("it should update account details for a trainer role", (done) => {
      const token = jwt.sign({ userId: 2, email: 'trainer@test.com', role: 'Trainer' }, 'your_secret_key', { expiresIn: '1h' });
  
      const requestBody = {
        firstName: 'Jane',
        lastName: 'Doe',
        bio: 'Experienced trainer',
        licensesAndCertificates: 'Certified Personal Trainer',
        focusArea: 'Strength Training'
      };
  
      chai.request(app)
        .put('/account')
        .set('Authorization', 'Bearer ' + token)
        .send(requestBody)
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  
    it("it should return 403 if the token is invalid", (done) => {
      const token = 'invalid-token';
  
      chai.request(app)
        .put('/account')
        .set('Authorization', 'Bearer ' + token)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });
  });    

  describe("/GET /clientDetails/:userId", () => {
    it("it should GET client details if the requester role is a Trainer", (done) => {
      const token = jwt.sign({ userId: 2, email: 'trainer@test.com', role: 'Trainer' }, 'your_secret_key', { expiresIn: '1h' });
  
      chai.request(app)
        .get('/clientDetails/2')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  
    it("it should return 403 if the requester role is not a Trainer", (done) => {
      const token = jwt.sign({ userId: 1, email: 'user@test.com', role: 'User' }, 'your_secret_key', { expiresIn: '1h' });
  
      chai.request(app)
        .get('/clientDetails/2')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });
  
    it("it should return 404 if the client does not exist", (done) => {
      const token = jwt.sign({ userId: 2, email: 'trainer@test.com', role: 'Trainer' }, 'your_secret_key', { expiresIn: '1h' });
  
      chai.request(app)
        .get('/clientDetails/999')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  
    it("it should return 403 if the token is invalid", (done) => {
      const token = 'invalid-token';
  
      chai.request(app)
        .get('/clientDetails/1')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });
  });  
});

