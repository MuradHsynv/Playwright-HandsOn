import { test, expect } from '@playwright/test';
import { API_BASE_URL } from '../playwright.config.js';

test.describe('JSONPlaceholder API Testing', () => {

  test('GET /users should return 200 and an array of users', async ({ request }) => {
    // Get request to fetch users
    const res = await request.get(`${API_BASE_URL}/users`);
    expect(res.status()).toBe(200);

    // Verify the response
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('email');
    expect(body[0]).toHaveProperty('id');
  });

  test('POST /users should return 201 with newly created user data', async ({ request }) => {
    // Create a new user
    const payload = { name: 'Murad', username: 'murad.qa', email: 'murad@example.com' };
    const res = await request.post(`${API_BASE_URL}/users`, { data: payload });
    expect(res.status()).toBe(201);

    // Verify the data in the response
    const body = await res.json();
    expect(body.name).toBe(payload.name);
    expect(body.username).toBe(payload.username);
    expect(body.email).toBe(payload.email);
    expect(body).toHaveProperty('id');
  });

  test('GET /users/521 should return 404 if user does not exist', async ({ request }) => {
    // Get request for a non-existent user
    const res = await request.get(`${API_BASE_URL}/users/521`);
    expect(res.status()).toBe(404);
  });

});
