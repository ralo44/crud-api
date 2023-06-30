const app = require("../../app.js");
const request = require('supertest');
let newUser = {
    username: "Osea",
    age: "32",
    hobbies: ["swim", "sing"]
  };
  let updateUser = {
    username: "Omar",
    age: "32",
    hobbies: ["swim", "sing"]
  };
let lastIdCreated;
describe('Test for API', () => {
    afterAll( () => {
        app.close();
      })
    test('Get all records with a GET api/users request', async () => {
        const req = await request(app).get(`/api/users`);
        expect(req.statusCode).toEqual(200);
    });
    test('A new object is created by a POST', async () => {
        const req = await request(app).post(`/api/users`).send(newUser);
        expect(req.statusCode).toEqual(201);
        const response = await request(app).get(`/api/users`);
        lastIdCreated = response._body[response._body.length -1].id;
    });
    test('GET api/user/{userId} ', async () => {
        const req = await request(app).get(`/api/users/${lastIdCreated}`);
        expect(req.statusCode).toEqual(200);
    });
    test('Update the created record  ', async () => {

        const req = await request(app).put(`/api/users/${lastIdCreated}`).send(updateUser);
        expect(req.statusCode).toEqual(200);
    });
    test('Delete the created record  ', async () => {
        const req = await request(app).delete(`/api/users/${lastIdCreated}`);
        expect(req.statusCode).toEqual(204);
    });
    test('GET deleted record ', async () => {
        const req = await request(app).get(`/api/users/${lastIdCreated}`);
        expect(req.statusCode).toEqual(400);
    });
});