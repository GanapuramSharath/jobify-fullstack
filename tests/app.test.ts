import request from "supertest";

import app from "../app";

describe("App", () => {
  test("GET test route", async () => {
    const res = await request(app).get("/api/v1/test");

    expect(res.statusCode).toBe(200);

    expect(res.body.msg).toBe("test route");
  });
});
