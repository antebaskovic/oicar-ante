const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../app');
const { expect } = chai;

chai.use(chaiHttp);

describe("Auth", () => {
    describe("/POST /register", () => {
        it("it should create a new user and return 201 with userId in response", (done) => {
            const requestBody = {
                email: 'user1@test.com',
                firstName: 'John',
                lastName: 'Doe',
                password: 'password',
                role: 'User'
            };

            chai.request(app)
                .post('/register')
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('userId');
                    done();
                });
        });

        it("it should create a new trainer and return 201 with userId in response", (done) => {
            const requestBody = {
                email: 'trainer1@test.com',
                firstName: 'Jane',
                lastName: 'Doe',
                password: 'password',
                role: 'Trainer'
            };

            chai.request(app)
                .post('/register')
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('userId');
                    done();
                });
        });

        it("it should return 500 if the server encounters an error", (done) => {
            // Missing password in the request body
            const requestBody = {
                email: 'invalid@test.com',
                firstName: 'Invalid',
                lastName: 'User',
                role: 'User'
            };

            chai.request(app)
                .post('/register')
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                });
        });
    });

    describe("/POST /login", () => {
        it("it should log in a valid user and return a JWT", (done) => {
            const requestBody = {
                email: 'user1@test.com',
                password: 'password'
            };

            chai.request(app)
                .post('/login')
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('accessToken');
                    done();
                });
        });

        it("it should return 401 for invalid password", (done) => {
            const requestBody = {
                email: 'user@test.com',
                password: 'wrongpassword'
            };

            chai.request(app)
                .post('/login')
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });
        });

        it("it should return 404 for non-existent user", (done) => {
            const requestBody = {
                email: 'nonexistent@test.com',
                password: 'password'
            };

            chai.request(app)
                .post('/login')
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });

    describe("/PUT /changePassword", () => {
        it("it should change password for a valid request", (done) => {
            const token = jwt.sign({ userId: 1, email: 'user@test.com', role: 'User' }, 'your_secret_key', { expiresIn: '1h' });
            const requestBody = {
                oldPassword: 'password',
                newPassword: 'newPassword'
            };

            chai.request(app)
                .put('/changePassword')
                .set('Authorization', 'Bearer ' + token)
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.text).to.equal('Password changed successfully');
                    done();
                });
        });

        it("it should return 401 for incorrect old password", (done) => {
            const token = jwt.sign({ userId: 1, email: 'user@test.com', role: 'User' }, 'your_secret_key', { expiresIn: '1h' });
            const requestBody = {
                oldPassword: 'wrongPassword',
                newPassword: 'newPassword'
            };

            chai.request(app)
                .put('/changePassword')
                .set('Authorization', 'Bearer ' + token)
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.text).to.equal('Incorrect old password');
                    done();
                });
        });

        it("it should return 404 for non-existent user", (done) => {
            const token = jwt.sign({ userId: 999, email: 'user@test.com', role: 'User' }, 'your_secret_key', { expiresIn: '1h' });
            const requestBody = {
                oldPassword: 'oldPassword',
                newPassword: 'newPassword'
            };

            chai.request(app)
                .put('/changePassword')
                .set('Authorization', 'Bearer ' + token)
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.text).to.equal('User not found');
                    done();
                });
        });
    });
});

