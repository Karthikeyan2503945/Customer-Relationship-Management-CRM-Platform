const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const authService = require('../services/authService');
const User = require('../models/User');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('Auth Service', () => {
  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'Sales Executive'
      };

      const user = await authService.registerUser(userData);

      expect(user).toBeDefined();
      expect(user.name).toBe('Test User');
      expect(user.email).toBe('test@example.com');
      expect(user.password).toBeUndefined(); // Should not return password
    });

    it('should throw error if email already exists', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      await authService.registerUser(userData);

      await expect(authService.registerUser(userData)).rejects.toThrow('Email already in use');
    });
  });

  describe('loginUser', () => {
    it('should login a user with correct credentials', async () => {
      const userData = {
        name: 'Login User',
        email: 'login@example.com',
        password: 'password123'
      };

      await authService.registerUser(userData);
      
      const { user, accessToken, refreshToken } = await authService.loginUser('login@example.com', 'password123');

      expect(user).toBeDefined();
      expect(user.email).toBe('login@example.com');
      expect(accessToken).toBeDefined();
      expect(refreshToken).toBeDefined();
    });

    it('should throw error with wrong password', async () => {
      const userData = {
        name: 'Wrong Pass User',
        email: 'wrongpass@example.com',
        password: 'password123'
      };

      await authService.registerUser(userData);
      
      await expect(authService.loginUser('wrongpass@example.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
    });
  });
});
