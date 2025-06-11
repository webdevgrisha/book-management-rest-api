import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../../server.js';
import { deleteUserService } from '../../../services/auth/deleteUser.service.js';

const registerEndpoint = '/auth/register';
const loginEndpoint = '/auth/login';
const booksEndpoint = '/books';

const testUser = {
  email: 'test-user-add-book@example.com',
  password: 'StrongPassw0rd!',
};

let userAuthToken: string;

beforeAll(async () => {
  await request(app).post(registerEndpoint).send(testUser);
  const loginRes = await request(app).post(loginEndpoint).send(testUser);
  userAuthToken = loginRes.body.token;
});

afterAll(async () => {
  await deleteUserService(testUser.email);
});

describe('Books Router Integration - POST /books', () => {
  it('should add a new book and return 201', async () => {
    const book = {
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      year: 1954,
      description: 'Epic fantasy novel',
      coverImageUrl: 'https://example.com/cover.jpg',
    };

    const res = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send(book);

    console.log('RESPONSE body: ', res.body);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('user_id');
    expect(res.body).toMatchObject({
      title: book.title,
      author: book.author,
      year: book.year,
      description: book.description,
      cover_image_url: book.coverImageUrl,
    });
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({ title: 'No Author', year: 2020 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for invalid year', async () => {
    const res = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({
        title: 'Invalid Year',
        author: 'Author',
        year: 'not-a-number',
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for invalid coverImageUrl', async () => {
    const res = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({
        title: 'Book',
        author: 'Author',
        year: 2020,
        coverImageUrl: 'not-a-url',
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 401 if no userAuthToken is provided', async () => {
    const book = {
      title: 'Book',
      author: 'Author',
      year: 2020,
    };
    const res = await request(app).post(booksEndpoint).send(book);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for empty body', async () => {
    const res = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for too short title', async () => {
    const res = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({
        title: 'AB', // min 3
        author: 'Valid Author',
        year: 2020,
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for too long title', async () => {
    const res = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({
        title: 'A'.repeat(151), // max 150
        author: 'Valid Author',
        year: 2020,
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for too short author', async () => {
    const res = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({
        title: 'Valid Title',
        author: 'AB', // min 3
        year: 2020,
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for too long author', async () => {
    const res = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({
        title: 'Valid Title',
        author: 'A'.repeat(101), // max 100
        year: 2020,
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for too long description', async () => {
    const res = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({
        title: 'Valid Title',
        author: 'Valid Author',
        year: 2020,
        description: 'A'.repeat(501), // max 500
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for year out of range (negative)', async () => {
    const res = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({
        title: 'Valid Title',
        author: 'Valid Author',
        year: -1, // min 0
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for year out of range (too big)', async () => {
    const res = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({
        title: 'Valid Title',
        author: 'Valid Author',
        year: new Date().getFullYear() + 1, // max current year
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
