import request from "supertest";
import app from "../app";

describe("Auth API", () => {
  test("register user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({
        name: "Test User",

        email: `test${Date.now()}@gmail.com`,

        password: "secret123",

        lastName: "User",

        location: "Hyderabad",
      });

    expect(res.statusCode).toBe(201);

    expect(res.body.msg).toBe("user created");
  });
});
test("login user", async () => {
  await request(app).post("/api/v1/auth/register").send({
    name: "Login Test",

    email: "login@test.com",

    password: "secret123",

    lastName: "User",

    location: "Hyderabad",
  });

  const res = await request(app).post("/api/v1/auth/login").send({
    email: "login@test.com",

    password: "secret123",
  });

  expect(res.statusCode).toBe(200);
});