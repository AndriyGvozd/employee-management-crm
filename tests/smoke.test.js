// tests/smoke.test.js
// Smoke suite: fast checks that the critical paths of the API are alive.
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const db = require('../models');

describe('Smoke: API', () => {
  let adminToken;
  let employeeToken;
  let projectId;

  before(async () => {
    await db.sequelize.query('DROP SCHEMA IF EXISTS public CASCADE;');
    await db.sequelize.query('CREATE SCHEMA public;');
    await db.sequelize.sync({ force: true });
  });

  describe('Service availability', () => {
    it('GET /health returns 200', async () => {
      const res = await request(app).get('/health');
      expect(res.status).to.equal(200);
    });

    it('GET /api-docs.json returns OpenAPI spec', async () => {
      const res = await request(app).get('/api-docs.json');
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('openapi');
      expect(res.body.paths).to.include.all.keys('/login', '/register', '/users', '/projects');
    });

    it('GET /api-docs serves Swagger UI', async () => {
      const res = await request(app).get('/api-docs/');
      expect(res.status).to.equal(200);
      expect(res.headers['content-type']).to.include('text/html');
      expect(res.text).to.include('<title>Swagger UI</title>');
    });
  });

  describe('Authentication', () => {
    it('registers an admin', async () => {
      const res = await request(app).post('/register').send({
        email: 'smoke.admin@example.com',
        password: 'adminpassword',
        firstName: 'Smoke',
        lastName: 'Admin',
        middleName: 'Middle',
        birthDate: '1985-01-01',
        phone: '+111111111',
        programmingLanguage: 'N/A',
        role: 'admin',
        secretWord: process.env.SECRET_WORD
      });
      expect(res.status).to.equal(201);
    });

    it('registers an employee', async () => {
      const res = await request(app).post('/register').send({
        email: 'smoke.employee@example.com',
        password: 'password123',
        firstName: 'Smoke',
        lastName: 'Employee',
        middleName: 'Middle',
        birthDate: '1995-01-01',
        phone: '+222222222',
        programmingLanguage: 'JavaScript'
      });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('userId');
    });

    it('logs in as admin and returns token', async () => {
      const res = await request(app)
        .post('/login')
        .send({ email: 'smoke.admin@example.com', password: 'adminpassword' });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
      adminToken = res.body.token;
    });

    it('logs in as employee and returns token', async () => {
      const res = await request(app)
        .post('/login')
        .send({ email: 'smoke.employee@example.com', password: 'password123' });
      expect(res.status).to.equal(200);
      employeeToken = res.body.token;
    });

    it('rejects login with wrong password', async () => {
      const res = await request(app)
        .post('/login')
        .send({ email: 'smoke.admin@example.com', password: 'wrong' });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.not.have.property('token');
    });
  });

  describe('Protected endpoints', () => {
    it('GET /profile without token returns 401', async () => {
      const res = await request(app).get('/profile');
      expect(res.status).to.equal(401);
    });

    it('GET /profile with token returns current user', async () => {
      const res = await request(app)
        .get('/profile')
        .set('Authorization', `Bearer ${employeeToken}`);
      expect(res.status).to.equal(200);
      expect(JSON.stringify(res.body)).to.include('smoke.employee@example.com');
    });

    it('GET /users returns list for admin', async () => {
      const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
    });

    it('GET /notifications returns 200', async () => {
      const res = await request(app)
        .get('/notifications')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
    });
  });

  describe('Projects CRUD', () => {
    it('admin creates a project', async () => {
      const res = await request(app)
        .post('/projects')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Smoke Project', description: 'Smoke test project', wage: 1000, active: true });
      expect(res.status).to.equal(201);
      projectId = res.body.project.id;
    });

    it('admin reads the project', async () => {
      const res = await request(app)
        .get(`/projects/${projectId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(JSON.stringify(res.body)).to.include('Smoke Project');
    });

    it('admin deletes the project', async () => {
      const res = await request(app)
        .delete(`/projects/${projectId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.be.oneOf([200, 204]);
    });

    it('deleted project is no longer available', async () => {
      const res = await request(app)
        .get(`/projects/${projectId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('error', 'Project not found');
    });
  });
});
