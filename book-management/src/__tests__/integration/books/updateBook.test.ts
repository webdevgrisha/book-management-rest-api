import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../../server.js';
import { deleteUserService } from '../../../services/auth/deleteUser.service.js';
import { BookCreateData } from 'models/book.types.js';

const registerEndpoint = '/auth/register';
const loginEndpoint = '/auth/login';
const booksEndpoint = '/books';

const testUser = {
  email: 'test-user-update-book@example.com',
  password: 'StrongPassw0rd!',
};

let userAuthToken: string;
let createdBookId: number;
let userId: number;
let book: BookCreateData;

beforeAll(async () => {
  await request(app).post(registerEndpoint).send(testUser);
  const loginRes = await request(app).post(loginEndpoint).send(testUser);
  userAuthToken = loginRes.body.token;
  book = {
    title: 'Book to Update',
    author: 'Author',
    year: 2020,
    description: 'Test book',
    coverImageUrl: 'https://example.com/cover.jpg',
  };
  const addRes = await request(app)
    .post(booksEndpoint)
    .set('Authorization', `Bearer ${userAuthToken}`)
    .send(book);
  createdBookId = addRes.body.id;
  userId = addRes.body.user_id;
});

afterAll(async () => {
  await deleteUserService(testUser.email);
});

describe('Books Router Integration - PATCH /books/:id', () => {
  it('should update a book and return 200', async () => {
    const update = {
      title: 'Updated Title',
      year: 2022,
      description: 'Updated description',
    };
    const res = await request(app)
      .patch(`${booksEndpoint}/${createdBookId}`)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send(update);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: createdBookId,
      user_id: userId,
      title: update.title,
      author: book.author,
      year: update.year,
      description: update.description,
      cover_image_url: book.coverImageUrl,
    });
  });

  it('should return 404 for non-existent book', async () => {
    const res = await request(app)
      .patch(`${booksEndpoint}/99999999`)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({ title: 'Does not exist' });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 401 if no userAuthToken is provided', async () => {
    const res = await request(app)
      .patch(`${booksEndpoint}/${createdBookId}`)
      .send({ title: 'No token' });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for invalid book id', async () => {
    const res = await request(app)
      .patch(`${booksEndpoint}/not-a-number`)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({ title: 'Invalid id' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for invalid update data', async () => {
    const res = await request(app)
      .patch(`${booksEndpoint}/${createdBookId}`)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({ year: -1 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for too short title', async () => {
    const res = await request(app)
      .patch(`${booksEndpoint}/${createdBookId}`)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({ title: 'AB' }); // min 3
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for too long title', async () => {
    const res = await request(app)
      .patch(`${booksEndpoint}/${createdBookId}`)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({ title: 'A'.repeat(151) }); // max 150
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for too short author', async () => {
    const res = await request(app)
      .patch(`${booksEndpoint}/${createdBookId}`)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({ author: 'AB' }); // min 3
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for too long author', async () => {
    const res = await request(app)
      .patch(`${booksEndpoint}/${createdBookId}`)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({ author: 'A'.repeat(101) }); // max 100
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for too long description', async () => {
    const res = await request(app)
      .patch(`${booksEndpoint}/${createdBookId}`)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({ description: 'A'.repeat(501) }); // max 500
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for year out of range (negative)', async () => {
    const res = await request(app)
      .patch(`${booksEndpoint}/${createdBookId}`)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({ year: -1 }); // min 0
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for year out of range (too big)', async () => {
    const res = await request(app)
      .patch(`${booksEndpoint}/${createdBookId}`)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({ year: new Date().getFullYear() + 1 }); // max current year
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for invalid coverImageUrl', async () => {
    const res = await request(app)
      .patch(`${booksEndpoint}/${createdBookId}`)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send({ coverImageUrl: 'not-a-url' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
