import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../../server.js';
import { deleteUserService } from '../../../services/auth/index.js';

const loginEndpoint = '/auth/login';
const registerEndpoint = '/auth/register';

const testUser = {
  email: 'test-user-login@example.com',
  password: 'StrongPassw0rd!',
};

beforeAll(async () => {
  await request(app).post(registerEndpoint).send(testUser);
});

afterAll(async () => {
  await deleteUserService(testUser.email);
});

describe('Auth Router Integration - /auth/login', () => {
  it('should log in an existing user and return a JWT token', async () => {
    const res = await request(app).post(loginEndpoint).send(testUser);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });

  it('should return 400 for invalid email format', async () => {
    const res = await request(app)
      .post(loginEndpoint)
      .send({ email: 'invalid-email', password: testUser.password });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 401 for wrong password', async () => {
    const res = await request(app)
      .post(loginEndpoint)
      .send({ email: testUser.email, password: 'WrongPassword123!' });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 404 for non-existent user', async () => {
    const res = await request(app)
      .post(loginEndpoint)
      .send({ email: 'nouser@example.com', password: 'StrongPassw0rd!' });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for empty body', async () => {
    const res = await request(app).post(loginEndpoint).send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
