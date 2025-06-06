import { describe, it, expect, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../../server.js';

describe('Auth Router Integration - /auth/register', () => {
  const endpoint = '/auth/register';
  const testUser = {
    email: 'user10@example.com',
    password: 'StrongPassw0rd!',
  };

  afterAll(async () => {
    
  });

  it('should register a new user and return 201', async () => {
    const res = await request(app).post(endpoint).send(testUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'User created');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', testUser.email);
  });

  it('should return 400 if user already exists', async () => {
    const res = await request(app).post(endpoint).send(testUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for invalid input', async () => {
    const res = await request(app).post(endpoint).send({
      email: 'invalid-email',
      password: '',
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
