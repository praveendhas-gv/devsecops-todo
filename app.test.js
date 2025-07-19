const request = require('supertest');
const express = require('express');
const appModule = require('./app'); 

let app;

beforeEach(() => {
  app = appModule(); // Create a fresh app instance for each test
});

describe('To-Do App', () => {
  it('should respond with 200 on GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  it('should add a todo item via POST /add', async () => {
    await request(app)
      .post('/add')
      .send('todo=TestItem')
      .expect(302);

    const res = await request(app).get('/');
    expect(res.text).toContain('TestItem');
  });

  it('should delete a todo item via POST /delete', async () => {
    await request(app).post('/add').send('todo=ToDelete');
    await request(app).post('/delete').send('index=0').expect(302);

    const res = await request(app).get('/');
    expect(res.text).not.toContain('ToDelete');
  });

  it('should return 200 on health check endpoint', async () => {
    const res = await request(app).get('/healthz');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('OK');
  });
});

