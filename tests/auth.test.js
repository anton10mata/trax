const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../server');
const { User } = require('../models');

let server;

beforeAll(() => {
  server = app.listen(4000, () => {
    console.log('Test server running on port 4000');
  });
});

afterAll((done) => {
  server.close(done);
});

beforeEach(async () => {
  await User.destroy({ where: {}, truncate: true }); // Clear Users table before each test
});

describe('Auth API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'employee',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should not register a user with an existing email', async () => {
    // Create a user first
    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedpassword',
      role: 'employee',
    });

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Jane Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'employee',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email already in use');
  });

  it('should login a user with correct credentials', async () => {
    // Create a user first
    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'employee',
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.token).toBeDefined();
  });

  it('should not login a user with incorrect password', async () => {
    // Create a user first
    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'employee',
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john@example.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Incorrect password');
  });

  it('should not login a non-existent user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });
});
