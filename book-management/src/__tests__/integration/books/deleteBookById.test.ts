import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../../server.js';
import { deleteUserService } from '../../../services/auth/deleteUser.service.js';

const registerEndpoint = '/auth/register';
const loginEndpoint = '/auth/login';
const booksEndpoint = '/books';

const testUser = {
  email: 'test-user-delete-book@example.com',
  password: 'StrongPassw0rd!',
};

let userAuthToken: string;
let createdBookId: number;

beforeAll(async () => {
  await request(app).post(registerEndpoint).send(testUser);

  const loginRes = await request(app).post(loginEndpoint).send(testUser);
  userAuthToken = loginRes.body.token;

  const book = {
    title: 'Book to Delete',
    author: 'Author',
    year: 2020,
  };

  const addRes = await request(app)
    .post(booksEndpoint)
    .set('Authorization', `Bearer ${userAuthToken}`)
    .send(book);

  createdBookId = addRes.body.id;
});

afterAll(async () => {
  await deleteUserService(testUser.email);
});

describe('Books Router Integration - DELETE /books/:id', () => {
  it('should delete a book and return 204', async () => {
    const res = await request(app)
      .delete(`${booksEndpoint}/${createdBookId}`)
      .set('Authorization', `Bearer ${userAuthToken}`);

    expect(res.status).toBe(204);
  });

  it('should return 404 when deleting a non-existent book', async () => {
    const res = await request(app)
      .delete(`${booksEndpoint}/${createdBookId}`)
      .set('Authorization', `Bearer ${userAuthToken}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 401 if no userAuthToken is provided', async () => {
    const res = await request(app).delete(`${booksEndpoint}/${createdBookId}`);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for invalid book id', async () => {
    const res = await request(app)
      .delete(`${booksEndpoint}/not-a-number`)
      .set('Authorization', `Bearer ${userAuthToken}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it("should not allow a user to delete another user's book", async () => {
    const otherUser = {
      email: 'other-user-delete-book@example.com',
      password: 'StrongPassw0rd!',
    };

    await request(app).post(registerEndpoint).send(otherUser);

    const loginRes = await request(app).post(loginEndpoint).send(otherUser);
    const otherUserToken = loginRes.body.token;

    const otherBook = {
      title: 'Other User Book',
      author: 'Other Author',
      year: 2021,
    };

    const addRes = await request(app)
      .post(booksEndpoint)
      .set('Authorization', `Bearer ${otherUserToken}`)
      .send(otherBook);
    const otherBookId = addRes.body.id;

    const res = await request(app)
      .delete(`${booksEndpoint}/${otherBookId}`)
      .set('Authorization', `Bearer ${userAuthToken}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');

    await request(app)
      .delete('/auth/delete')
      .set('Authorization', `Bearer ${otherUserToken}`)
      .send({ email: otherUser.email });
  });
});
