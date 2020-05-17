process.env.NODE_ENV = 'test';

// Librerías
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);
const url = 'http://localhost:8000';

// Token de prueba
let token; // = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlcyI6WyJhZG1pbiIsIm5vcm1hbCJdLCJpYXQiOjE1ODk3MTQyNzUsImV4cCI6MTU4OTcxNzg3NX0.JDN8ewnP0lZWiuJ6XIb5yNezM4CkOOU-tmTOXQMTxb';
let refreshToken; // = '51100f2c-3cef-4161-b883-c87da9891db';


/**
 * TEST: AUTH
 */
// eslint-disable-next-line no-undef
describe('Batería de tests de Auth', () => {
  /**
   * TEST POST Login correcto
   */
  // eslint-disable-next-line no-undef
  describe('Identificar un usuario correcto: ', () => {
    // eslint-disable-next-line no-undef
    it('Debería autenticar al usuario', (done) => {
      const user = {
        username: 'admin',
        email: 'admin@admin.com',
        password: '$2b$10$oN1K03f5kjqa23HGei5vZ.1OjB5frIw7vw8F0KuvT1LUobUMVLLIG',
      };
      chai.request(url)
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          // console.log(res.body);
          expect(res).to.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          res.body.should.have.property('refreshToken');
          token = res.body.token;
          refreshToken = res.body.refreshToken;
          done();
        });
    });
  });

  /**
   * TEST POST Login incorrecto
   */
  // eslint-disable-next-line no-undef
  describe('No Identificar un usuario es incorrecto: ', () => {
    // eslint-disable-next-line no-undef
    it('No Debería autenticar al usuario', (done) => {
      const userWrong = {
        username: 'admin',
        email: 'admin@admin.com',
        password: '$2b$10$oN1K03f5kjqa23HGei5vZ.1OjB5frIw7vw8F0KuvT1LUobUMVLLI',
      };
      chai.request(url)
        .post('/auth/login')
        .send(userWrong)
        .end((err, res) => {
          // console.log(res.body);
          expect(res).to.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });

  /**
   * TEST POST Refrescar Token
   */
  // eslint-disable-next-line no-undef
 /*  describe('Refrescar token: ', () => {
    // eslint-disable-next-line no-undef
    it('Debería refrescar Token', (done) => {
      const user = {
        username: 'admin',
        email: 'admin@admin.com',
        role: '[\'admin\', \'normal\']',
        refreshToken,
      };
      chai.request(url)
        .post('/auth/login')
        .set({ Authorization: `Bearer ${token}` })
        .send(user)
        .end((err, res) => {
          // console.log(res.body);
          expect(res).to.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          res.body.should.have.property('refreshToken');
          done();
        });
    });
  });
 */
  /**
   * TEST GET, Ver Datos de usuario
   */
  // eslint-disable-next-line no-undef
  describe('Ver datos de usuario: ', () => {
    // eslint-disable-next-line no-undef
    it('Debería ver los datos del usuario', (done) => {
      chai.request(url)
        .get('/auth/me')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          // console.log(res.body);
          expect(res).to.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('username');
          res.body.should.have.property('email');
          res.body.should.have.property('roles');
          done();
        });
    });
  });

// Auth
});
