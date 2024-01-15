const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOne, userOneId, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should signup new user', async () => {
  const response = await request(app).post('/users').send({
    name: "Abel",
    email: "abel@gmail.com",
    password: "often#123"
  }).expect(201)

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull;

  expect(response.body).toMatchObject({
    user: {
      name: 'Abel',
      email: 'abel@gmail.com'
    },
    token: user.tokens[0].token
  })
  expect(user.password).not.toBe(response.body.password)
})

test('Should login existing user', async () => {
  const response = await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)

  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login existing user', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: 'Often'
  }).expect(400)
})

test('Should get user info', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
})

test('Should not profile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401);
})

test('Should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  const user = await User.findById(userOneId);
  expect(user).toBeNull();

})

test('Should not delete account for unauthenticate user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/pic.jpg')
    .expect(200)

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
})

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Weeknd"
    })
    .expect(200)

  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Weeknd");
})

test('Should not update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "hello"
    })
    .expect(400)
})