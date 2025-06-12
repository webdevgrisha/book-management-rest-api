import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../../server.js';
import { deleteUserService } from '../../../services/auth/deleteUser.service.js';
import { BookCreateData, BookRow } from '../../../models/book.types.js';

const registerEndpoint = '/auth/register';
const loginEndpoint = '/auth/login';
const booksEndpoint = '/books';

const testUser = {
  email: 'test-user-get-books@example.com',
  password: 'StrongPassw0rd!',
};

let userAuthToken: string;
let createdBookIds: number[] = [];
const books: BookCreateData[] = [];

beforeAll(async () => {
  await request(app).post(registerEndpoint).send(testUser);

  const loginRes = await request(app).post(loginEndpoint).send(testUser);

  userAuthToken = loginRes.body.token;

  for (let i = 1; i <= 15; i++) {
    const book = {
      title: `Book ${i}`,
      author: `Author ${i}`,
      year: 2000 + i,
      description: `Description ${i}`,
      coverImageUrl: `https://example.com/cover${i}.jpg`,
    };

    books.push(book);

    const addRes = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`)
      .send(book);

    createdBookIds.push(addRes.body.id);
  }
});

afterAll(async () => {
  await deleteUserService(testUser.email);
});

describe('Books Router Integration - GET /books (pagination)', () => {
  it('should return first page of books with default limit', async () => {
    const res = await request(app)
      .get(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('pagination');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeLessThanOrEqual(10); // default limit
    expect(res.body.pagination).toMatchObject({
      currPage: 1,
      limit: 10,
      totalCount: 15,
      totalPages: 2,
      hasNextPage: true,
      hasPrevPage: false,
    });
  });

  it('should return second page of books with limit=10', async () => {
    const res = await request(app)
      .get(`${booksEndpoint}?limit=10&currPage=2`)
      .set('Authorization', `Bearer ${userAuthToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(5);
    expect(res.body.pagination).toMatchObject({
      currPage: 2,
      limit: 10,
      totalCount: 15,
      totalPages: 2,
      hasNextPage: false,
      hasPrevPage: true,
    });
  });

  it('should return correct books for page 2', async () => {
    const res = await request(app)
      .get(`${booksEndpoint}?limit=10&currPage=2`)
      .set('Authorization', `Bearer ${userAuthToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data[0]).toMatchObject({
      title: 'Book 11',
      author: 'Author 11',
      year: 2011,
      description: 'Description 11',
      cover_image_url: 'https://example.com/cover11.jpg',
    });
  });

  it('should return 401 if no userAuthToken is provided', async () => {
    const res = await request(app).get(booksEndpoint);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for invalid limit or currPage', async () => {
    const res = await request(app)
      .get(`${booksEndpoint}?limit=-1&currPage=0`)
      .set('Authorization', `Bearer ${userAuthToken}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if limit is not a number', async () => {
    const res = await request(app)
      .get(`${booksEndpoint}?limit=abc&currPage=1`)
      .set('Authorization', `Bearer ${userAuthToken}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if currPage is not a number', async () => {
    const res = await request(app)
      .get(`${booksEndpoint}?limit=10&currPage=xyz`)
      .set('Authorization', `Bearer ${userAuthToken}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it("should not allow a user to get another user's books", async () => {
    const otherUser = {
      email: 'other-user-get-books@example.com',
      password: 'StrongPassw0rd!',
    };

    await request(app).post(registerEndpoint).send(otherUser);
    const loginRes = await request(app).post(loginEndpoint).send(otherUser);
    const otherUserToken = loginRes.body.token;

    for (let i = 1; i <= 3; i++) {
      const book = {
        title: `Other Book ${i}`,
        author: `Other Author ${i}`,
        year: 2010 + i,
        description: `Other Description ${i}`,
        coverImageUrl: `https://example.com/other-cover${i}.jpg`,
      };

      await request(app)
        .post(booksEndpoint)
        .set('Authorization', `Bearer ${otherUserToken}`)
        .send(book);
    }

    const res = await request(app)
      .get(booksEndpoint)
      .set('Authorization', `Bearer ${userAuthToken}`);

    expect(res.status).toBe(200);
    expect((res.body.data as BookRow[]).every((b) => !b.title.startsWith('Other Book'))).toBe(true);
  });
});
