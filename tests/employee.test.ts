import request from "supertest";
import app from "../server";

let created_id: number;

describe("EMPLOYEE TESTING", () => {
  it("should not create employee cuz bad email", async () => {
    const res = await request(app).post("/api/employee/").send({
      name: "Some random name",
      email: "sometestmailtest.com",
    });
    expect(res.body.error).toBeTruthy();
  });
  it("should create employee successfully", async () => {
    const res = await request(app).post("/api/employee/").send({
      name: "Some random name",
      email: "sometestmail@test.com",
    });
    created_id = res.body.id;
    expect(res.body.name && res.body.email).toBeTruthy();
  });
  it("should update employee", async () => {
    const res = await request(app).put("/api/employee").send({
      id: created_id,
      name: "Your updated employee",
      email: "updatedmail@gmail.com",
    });
    expect(res.body.name && res.body.email).toBeTruthy();
  });
  it("should delete employee", async () => {
    const res = await request(app).put("/api/employee").send({
      id: created_id,
      _delete: true,
    });
    expect(res.body.success).toBeTruthy();
  });
});
