const request = require('supertest');
const app = require('../app');

describe("POST /note", () => {
    let id = 0;

    test("It should respond with a 201 status code", async () => {
        const newTestNote = {
            title: "Test Note",
            content: "Test Content"
        }

        const response = await request(app).post('/note').send(newTestNote);
        expect(response.status).toBe(201);
        const data = response.body.data;
        expect(data.title).toBe(newTestNote.title);
        expect(data.content).toBe(newTestNote.content);
        console.log("ID:", data.id);
        id = data.id;
    });

    test("GET /note/:id", async () => {
        const response = await request(app).get(`/note/${id}`);
        expect(response.status).toBe(200);
        const data = response.body.data;
        expect(data.id).toBe(id);
    });

    test("PUT /note/:id", async () => {
        const updatedTestNote = {
            title: "Updated Test Note",
            content: "Updated Test Content"
        }

        const response = await request(app).put(`/note/${id}`).send(updatedTestNote);
        expect(response.status).toBe(200);
        const data = response.body.data;
        expect(data.title).toBe(updatedTestNote.title);
        expect(data.content).toBe(updatedTestNote.content);
    });

    test("DELETE /note/:id", async () => {
        const response = await request(app).delete(`/note/${id}`);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe(null);
    });
});