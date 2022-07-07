import request from "supertest";
import app from "../server";

describe("TIMESLOT TESTING", () => {
  var created_id: number;
  afterAll(async () => {
    const res = await request(app).put("/api/timeslot").send({
      id: created_id,
      _delete: true,
    });
    console.log(res.body);
  });
  it("should not create time slot cuz bad limits", async () => {
    const res = await request(app).post("/api/timeslot/").send({
      start: "Thu Jul 07 2022 12:00:00 GMT+0100 (GMT+01:00)",
      end: "Thu Jul 07 2022 11:00:00 GMT+0100 (GMT+01:00)",
    });
    expect(res.body.error).toBeTruthy();
  });
  it("should create time slot successfully", async () => {
    const res = await request(app).post("/api/timeslot/").send({
      start: "Thu Jul 07 2022 12:00:00 GMT+0100 (GMT+01:00)",
      end: "Thu Jul 07 2022 17:00:00 GMT+0100 (GMT+01:00)",
    });
    created_id = res.body.id;
    expect(res.body.start && res.body.end).toBeTruthy();
  });
  it("should not create time slot cuz overlapping start time", async () => {
    const res = await request(app).post("/api/timeslot/").send({
      start: "Thu Jul 07 2022 12:00:00 GMT+0100 (GMT+01:00)",
      end: "Thu Jul 07 2022 17:00:00 GMT+0100 (GMT+01:00)",
    });
    created_id = res.body.id;
    expect(res.body.error).toBeTruthy();
  });
  it("should not update time slot cuz bad limits", async () => {
    const res = await request(app).put("/api/timeslot/").send({
      id: created_id,
      start: "Thu Jul 07 2022 12:00:00 GMT+0100 (GMT+01:00)",
      end: "Thu Jul 07 2022 11:00:00 GMT+0100 (GMT+01:00)",
    });
    expect(res.body.error).toBeTruthy();
  });
  it("should update time slot", async () => {
    const res = await request(app).put("/api/timeslot").send({
      id: created_id,
      start: "Thu Jul 07 2022 23:00:00 GMT+0100 (GMT+01:00)",
      end: "Thu Jul 07 2022 23:30:00 GMT+0100 (GMT+01:00)",
    });
    expect(res.body.start && res.body.end).toBeTruthy();
  });
});
