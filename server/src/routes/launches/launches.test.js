const request = require('supertest');
const { app } = require('../../app');

describe('Test GET /launches', () => {
  test('It should respond with 200 success', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200);
    // expect(response.statusCode).toBe(200);
  });
});
let completeLaunchData = {
  mission: 'Test',
  rocket: 'Test IS1',
  launchDate: 'Dec 21,2022',
  target: 'Test-442 b',
};
let launchDataWithoutDate = {
  mission: 'Test',
  rocket: 'Test IS1',
  target: 'Test-442 b',
};
let launchDataWithInvalidDate = {
  mission: 'Test',
  rocket: 'Test IS1',
  launchDate: 'WrongDate',
  target: 'Test-442 b',
};

describe('Test POST /launches', () => {
  test('It should respond with 201 created', async () => {
    const response = await request(app)
      .post('/launches')
      .send(completeLaunchData)
      .expect('Content-Type', /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
    // expect(response).toBe(200);
  });

  test('It should catch missing required properties', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithoutDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Missing required properties',
    });
  });
  test('It should catch invalid dates', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithInvalidDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Invalid launch date',
    });
  });
});
