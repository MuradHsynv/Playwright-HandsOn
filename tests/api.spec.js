import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder API Testing', () => {

  test('GET /users should return 200 and an array of users', async ({ request }) => {
    // Get request to fetch users
    const res = await request.get('/users');
    expect(res.status(), 'Response status should be 200').toBe(200);

    // Verify the response
    const body = await res.json();
    expect(Array.isArray(body), 'Response should be an array').toBe(true);
    expect(body.length, 'Response array should have at least one user').toBeGreaterThan(0);
    expect(body[0], 'First user should have an email property').toHaveProperty('email');
    expect(body[0], 'First user should have an id property').toHaveProperty('id');
  });

  test('POST /users should return 201 with newly created user data', async ({ request }) => {
    // Create a new user
    const payload = { name: 'Murad', username: 'murad.qa', email: 'murad@example.com' };
    const res = await request.post('/users', { data: payload });
    expect(res.status(), 'Response status should be 201').toBe(201);

    // Verify the data in the response
    const body = await res.json();
    expect(body.name, 'Response should have the correct name').toBe(payload.name);
    expect(body.username, 'Response should have the correct username').toBe(payload.username);
    expect(body.email, 'Response should have the correct email').toBe(payload.email);
    expect(body, 'Response should have an id property').toHaveProperty('id');
  });

  test('GET /users/521 should return 404 if user does not exist', async ({ request }) => {
    // Get request for a non-existent user
    const res = await request.get('/users/521');
    expect(res.status(), 'Response status should be 404 for non-existent user').toBe(404);
  });

});
