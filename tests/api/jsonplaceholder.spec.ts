import { test, expect } from '@playwright/test';

/**
 * REST API tests against the public JSONPlaceholder service.
 * Demonstrates status/schema/contract checks for GET, POST, PUT and DELETE,
 * plus a negative case - all without a browser.
 */
const API = 'https://jsonplaceholder.typicode.com';

test.describe('JSONPlaceholder REST API', { tag: '@regression' }, () => {
  test(
    'GET /posts/1 returns a well-formed post',
    { tag: '@smoke' },
    async ({ request }) => {
      const res = await request.get(`${API}/posts/1`);
      expect(res.status()).toBe(200);

      const post = await res.json();
      expect(post).toMatchObject({
        id: 1,
        userId: expect.any(Number),
        title: expect.any(String),
        body: expect.any(String),
      });
    },
  );

  test('GET /posts returns a non-empty collection', async ({ request }) => {
    const res = await request.get(`${API}/posts`);
    expect(res.ok()).toBeTruthy();

    const posts = await res.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(10);
  });

  test('POST /posts creates a resource', async ({ request }) => {
    const payload = { title: 'qa', body: 'automated', userId: 99 };
    const res = await request.post(`${API}/posts`, { data: payload });

    expect(res.status()).toBe(201);
    expect(await res.json()).toMatchObject(payload);
  });

  test('PUT /posts/1 updates a resource', async ({ request }) => {
    const res = await request.put(`${API}/posts/1`, {
      data: { id: 1, title: 'updated', body: 'b', userId: 1 },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).title).toBe('updated');
  });

  test('DELETE /posts/1 succeeds', async ({ request }) => {
    const res = await request.delete(`${API}/posts/1`);
    expect(res.ok()).toBeTruthy();
  });

  test('GET /posts/0 returns 404 (negative case)', async ({ request }) => {
    const res = await request.get(`${API}/posts/0`);
    expect(res.status()).toBe(404);
  });
});
