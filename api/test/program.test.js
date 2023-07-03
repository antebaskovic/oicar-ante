const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../app');  

chai.use(chaiHttp);
chai.should();

const secretKey = 'your_secret_key'; 
      
const trainerToken = jwt.sign({ userId: 1, role: 'Trainer' }, secretKey);
const userToken = jwt.sign({ userId: 2, role: 'User' }, secretKey);

describe("Program", () => {
    describe('POST /program', () => {  
        it('should create a new program and return 201 when a valid request is made by a trainer', (done) => {
          chai
            .request(app)
            .post('/program')
            .set('Authorization', `Bearer ${trainerToken}`)
            .send({
              name: 'Program Name',
              description: 'Program Description',
              category: 'Program Category',
            })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.have.property('programId');
              done();
            });
        });
      
        it('should return 403 when a user who is not a trainer tries to create a program', (done) => {
          chai
            .request(app)
            .post('/program')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
              name: 'Program Name',
              description: 'Program Description',
              category: 'Program Category',
            })
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        });
      });

      describe('GET /program', () => {      
        it('should get all programs of a trainer when the trainer makes a request', (done) => {
          chai
            .request(app)
            .get('/program')
            .set('Authorization', `Bearer ${trainerToken}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
        });
      
        it('should get all programs of a user when the user makes a request', (done) => {
          chai
            .request(app)
            .get('/program')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
        });
      });

      describe('GET /program/all', () => {      
        it('should get all programs when a user makes a request', (done) => {
          chai
            .request(app)
            .get('/program/all')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
        });
      
        it('should not get programs when a trainer makes a request', (done) => {
          chai
            .request(app)
            .get('/program/all')
            .set('Authorization', `Bearer ${trainerToken}`)
            .end((err, res) => {
              res.should.have.status(500);
              done();
            });
        });
      });

      describe('GET /program/:programId/details', () => {
        it('should get program details when a trainer makes a request', (done) => {
          chai
            .request(app)
            .get('/program/1/details')
            .set('Authorization', `Bearer ${trainerToken}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('enrolledUsers').that.is.a('array');
              done();
            });
        });
      
        it('should not get program details when a user makes a request', (done) => {
          chai
            .request(app)
            .get('/program/1/details')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        });
      });

      describe('POST /program/:programId/enroll', () => {      
        it('should allow a user to enroll in a program', (done) => {
          chai
            .request(app)
            .post('/program/1/enroll')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
              res.should.have.status(201);
              done();
            });
        });
      
        it('should not allow a trainer to enroll in a program', (done) => {
          chai
            .request(app)
            .post('/program/1/enroll')
            .set('Authorization', `Bearer ${trainerToken}`)
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        });
      });

      describe('POST /program/:programId/training', () => {      
        it('should create a new training and return 201 when a valid request is made by a trainer', (done) => {
          chai
            .request(app)
            .post('/program/1/training')
            .set('Authorization', `Bearer ${trainerToken}`)
            .send({
              type: 'Cardio',
              daysOfWeek: 'Monday, Wednesday, Friday',
              name: 'Cardio Plan',
              plan: 'Running',
              notes: 'Bring water',
              difficulty: 'Medium',
            })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.have.property('trainingId');
              done();
            });
        });
      
        it('should return 403 when a user who is not a trainer tries to create a training', (done) => {
          chai
            .request(app)
            .post('/program/1/training')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
              type: 'Cardio',
              daysOfWeek: 'Monday, Wednesday, Friday',
              name: 'Cardio Plan',
              plan: 'Running',
              notes: 'Bring water',
              difficulty: 'Medium',
            })
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        });
      });

      describe('POST /program/:programId/meal', () => {      
        it('should create a new meal and return 201 when a valid request is made by a trainer', (done) => {
          chai
            .request(app)
            .post('/program/1/meal')
            .set('Authorization', `Bearer ${trainerToken}`)
            .send({
              daysOfWeek: 'Monday, Wednesday, Friday',
              type: 'Breakfast',
              name: 'Oatmeal',
              calories: 200,
              carbs: 40,
              protein: 6,
              fats: 3,
              description: 'Healthy breakfast option',
            })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.have.property('mealId');
              done();
            });
        });
      
        it('should return 403 when a user who is not a trainer tries to create a meal', (done) => {
          chai
            .request(app)
            .post('/program/1/meal')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
              daysOfWeek: 'Monday, Wednesday, Friday',
              type: 'Breakfast',
              name: 'Oatmeal',
              calories: 200,
              carbs: 40,
              protein: 6,
              fats: 3,
              description: 'Healthy breakfast option',
            })
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        });
      });

      describe('PUT /program/:programId', () => {      
        it('should update program details and return 204 when a valid request is made by a trainer', (done) => {
          chai
            .request(app)
            .put('/program/1')
            .set('Authorization', `Bearer ${trainerToken}`)
            .send({
              name: 'New Program Name',
              description: 'New Program Description',
              category: 'New Category',
            })
            .end((err, res) => {
              res.should.have.status(204);
              done();
            });
        });
      
        it('should return 403 when a user who is not a trainer tries to update program details', (done) => {
          chai
            .request(app)
            .put('/program/1')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
              name: 'New Program Name',
              description: 'New Program Description',
              category: 'New Category',
            })
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        });
      });

      describe('DELETE /program/:programId', () => {
        it('should delete a program and return 204 when a valid request is made by a trainer', (done) => {
          chai
            .request(app)
            .delete('/program/1')
            .set('Authorization', `Bearer ${trainerToken}`)
            .end((err, res) => {
              res.should.have.status(204);
              done();
            });
        });
      
        it('should return 403 when a user who is not a trainer tries to delete a program', (done) => {
          chai
            .request(app)
            .delete('/program/1')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        });
      });

      describe('PUT /meal/:mealId', () => {      
        it('should update meal details and return 204 when a valid request is made by a trainer', (done) => {
          chai
            .request(app)
            .put('/meal/1')
            .set('Authorization', `Bearer ${trainerToken}`)
            .send({
              daysOfWeek: 'Monday, Wednesday, Friday',
              type: 'Breakfast',
              name: 'New Oatmeal',
              calories: 250,
              carbs: 50,
              protein: 8,
              fats: 4,
              description: 'Updated healthy breakfast option',
            })
            .end((err, res) => {
              res.should.have.status(204);
              done();
            });
        });
      
        it('should return 403 when a user who is not a trainer tries to update meal details', (done) => {
          chai
            .request(app)
            .put('/meal/1')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
              daysOfWeek: 'Monday, Wednesday, Friday',
              type: 'Breakfast',
              name: 'New Oatmeal',
              calories: 250,
              carbs: 50,
              protein: 8,
              fats: 4,
              description: 'Updated healthy breakfast option',
            })
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        });
      });

      describe('DELETE /meal/:mealId', () => {      
        it('should delete a meal and return 204 when a valid request is made by a trainer', (done) => {
          chai
            .request(app)
            .delete('/meal/1')
            .set('Authorization', `Bearer ${trainerToken}`)
            .end((err, res) => {
              res.should.have.status(204);
              done();
            });
        });
      
        it('should return 403 when a user who is not a trainer tries to delete a meal', (done) => {
          chai
            .request(app)
            .delete('/meal/1')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        });
      });

      describe('PUT /training/:trainingId', () => {      
        it('should update training details and return 204 when a valid request is made by a trainer', (done) => {
          chai
            .request(app)
            .put('/training/1')
            .set('Authorization', `Bearer ${trainerToken}`)
            .send({
              type: 'Cardio',
              daysOfWeek: 'Monday, Wednesday, Friday',
              name: 'New Training',
              plan: 'Updated training plan',
              notes: 'Updated training notes',
              difficulty: 'Hard',
            })
            .end((err, res) => {
              res.should.have.status(204);
              done();
            });
        });
      
        it('should return 403 when a user who is not a trainer tries to update training details', (done) => {
          chai
            .request(app)
            .put('/training/1')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
              type: 'Cardio',
              daysOfWeek: 'Monday, Wednesday, Friday',
              name: 'New Training',
              plan: 'Updated training plan',
              notes: 'Updated training notes',
              difficulty: 'Hard',
            })
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        });
      });

      describe('DELETE /training/:trainingId', () => {      
        it('should delete a training and return 204 when a valid request is made by a trainer', (done) => {
          chai
            .request(app)
            .delete('/training/1')
            .set('Authorization', `Bearer ${trainerToken}`)
            .end((err, res) => {
              res.should.have.status(204);
              done();
            });
        });
      
        it('should return 403 when a user who is not a trainer tries to delete a training', (done) => {
          chai
            .request(app)
            .delete('/training/1')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        });
      });

      describe('GET /meal/all', () => {      
        it('should return all meals associated with the trainer when a valid request is made by a trainer', (done) => {
          chai
            .request(app)
            .get('/meal/all')
            .set('Authorization', `Bearer ${trainerToken}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('array');
              done();
            });
        });
      
        it('should return 403 when a user who is not a trainer tries to access all meals', (done) => {
          chai
            .request(app)
            .get('/meal/all')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        });
      });

      describe('GET /meal/:mealId/details', () => {      
        it('should return meal details when a valid request is made by a trainer', (done) => {
          chai
            .request(app)
            .get('/meal/1/details')
            .set('Authorization', `Bearer ${trainerToken}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('array');
              done();
            });
        });
      
        it('should return 403 when a user who is not a trainer tries to access meal details', (done) => {
          chai
            .request(app)
            .get('/meal/1/details')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        });
      });
});

