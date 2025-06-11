import { describe, it, expect, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../../server.js';
import { deleteUserService } from '../../../services/auth/deleteUser.service.js';

const registerEndpoint = '/auth/register';

const testUser = {
  email: 'test-user-register@example.com',
  password: 'StrongPassw0rd!',
};

afterAll(async () => {
  await deleteUserService(testUser.email);
});

describe('Auth Router Integration - /auth/register', () => {
  it('should register a new user and return 201', async () => {
    const res = await request(app).post(registerEndpoint).send(testUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'User created.');
  });

  it('should return 400 if user already exists', async () => {
    const res = await request(app).post(registerEndpoint).send(testUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for invalid email', async () => {
    const res = await request(app).post(registerEndpoint).send({
      email: 'invalid-email',
      password: testUser.password,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for weak password', async () => {
    const res = await request(app).post(registerEndpoint).send({
      email: testUser.email,
      password: '123',
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for very long email', async () => {
    const res = await request(app)
      .post(registerEndpoint)
      .send({
        email: 'a'.repeat(300) + '@example.com',
        password: 'StrongPassw0rd!',
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for very long password', async () => {
    const res = await request(app)
      .post(registerEndpoint)
      .send({
        email: 'test-user-register-1@example.com',
        password: 'a'.repeat(300),
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for SQL injection attempt', async () => {
    const res = await request(app).post(registerEndpoint).send({
      email: "' OR 1=1;--@example.com",
      password: 'StrongPassw0rd!',
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
