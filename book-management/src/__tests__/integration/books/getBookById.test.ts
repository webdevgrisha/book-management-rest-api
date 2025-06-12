import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../../server.js';
import { deleteUserService } from '../../../services/auth/deleteUser.service.js';
import { BookCreateData } from 'models/book.types.js';

const registerEndpoint = '/auth/register';
const loginEndpoint = '/auth/login';
const booksEndpoint = '/books';

const testUser = {
  email: 'test-user-get-book@example.com',
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
    title: 'Book to Get',
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

describe('Books Router Integration - GET /books/:id', () => {
  it('should get a book by id and return 200', async () => {
    const res = await request(app)
      .get(`${booksEndpoint}/${createdBookId}`)
      .set('Authorization', `Bearer ${userAuthToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: createdBookId,
      user_id: userId,
      title: book.title,
      author: book.author,
      year: book.year,
      description: book.description,
      cover_image_url: book.coverImageUrl,
    });
  });

  it('should return 404 for non-existent book', async () => {
    const res = await request(app)
      .get(`${booksEndpoint}/99999999`)
      .set('Authorization', `Bearer ${userAuthToken}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 401 if no userAuthToken is provided', async () => {
    const res = await request(app).get(`${booksEndpoint}/${createdBookId}`);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for invalid book id', async () => {
    const res = await request(app)
      .get(`${booksEndpoint}/not-a-number`)
      .set('Authorization', `Bearer ${userAuthToken}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for too short title', async () => {
    const invalidBook = { ...book, title: 'AB' };

    const addRes = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send(invalidBook);

    expect(addRes.status).toBe(400);
    expect(addRes.body).toHaveProperty('error');
  });

  it('should return 400 for too long title', async () => {
    const invalidBook = { ...book, title: 'A'.repeat(151) };

    const addRes = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send(invalidBook);

    expect(addRes.status).toBe(400);
    expect(addRes.body).toHaveProperty('error');
  });

  it('should return 400 for too short author', async () => {
    const invalidBook = { ...book, author: 'AB' };

    const addRes = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send(invalidBook);

    expect(addRes.status).toBe(400);
    expect(addRes.body).toHaveProperty('error');
  });

  it('should return 400 for too long author', async () => {
    const invalidBook = { ...book, author: 'A'.repeat(101) };

    const addRes = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send(invalidBook);

    expect(addRes.status).toBe(400);
    expect(addRes.body).toHaveProperty('error');
  });

  it('should return 400 for too long description', async () => {
    const invalidBook = { ...book, description: 'A'.repeat(501) };

    const addRes = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send(invalidBook);

    expect(addRes.status).toBe(400);
    expect(addRes.body).toHaveProperty('error');
  });

  it('should return 400 for year out of range (negative)', async () => {
    const invalidBook = { ...book, year: -1 };

    const addRes = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send(invalidBook);

    expect(addRes.status).toBe(400);
    expect(addRes.body).toHaveProperty('error');
  });

  it('should return 400 for year out of range (too big)', async () => {
    const invalidBook = { ...book, year: 3001 };

    const addRes = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send(invalidBook);

    expect(addRes.status).toBe(400);
    expect(addRes.body).toHaveProperty('error');
  });

  it('should return 400 for invalid coverImageUrl', async () => {
    const invalidBook = { ...book, coverImageUrl: 'not-a-url' };

    const addRes = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send(invalidBook);

    expect(addRes.status).toBe(400);
    expect(addRes.body).toHaveProperty('error');
  });

  it("should not allow a user to get another user's book by id", async () => {
    const otherUser = {
      email: 'other-user-get-book@example.com',
      password: 'StrongPassw0rd!',
    };

    await request(app).post(registerEndpoint).send(otherUser);

    const loginRes = await request(app).post(loginEndpoint).send(otherUser);
    const otherUserToken = loginRes.body.token;

    const otherBook = {
      title: 'Other User Book',
      author: 'Other Author',
      year: 2021,
      description: 'Other description',
      coverImageUrl: 'https://example.com/other-cover.jpg',
    };

    const addRes = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${otherUserToken}`)
      .send(otherBook);
    const otherBookId = addRes.body.id;

    const res = await request(app)
      .get(`${booksEndpoint}/${otherBookId}`)
      .set('Authorization', `Bearer ${userAuthToken}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});
