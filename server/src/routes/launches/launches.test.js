const request = require("supertest");
const { app } = require(`${__dirname}/../../app.js`);
const { mongoConnect, mongoDisconnet } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoDisconnet();
  });

  describe("Test GET /launches", () => {
    test("It should respond with a 200 success", async () => {
      const response = await request(app)
        .get("/launches")
        .expect("Content-type", /json/)
        .expect(200);
    });
  });
  const completeLaunchData = {
    mission: "Test",
    rocket: "Test",
    target: "Kepler-62 f",
    launchDate: "December 10,2022",
  };
  const launchDataWithoutDate = {
    mission: "Test",
    rocket: "Test",
    target: "Kepler-62 f",
  };

  const launchDataWithInvalidDate = {
    mission: "Test",
    rocket: "Test",
    target: "Kepler-62 f",
    launchDate: "WrongDate", //not a valid date format
  };
  describe("Test POST /launches", () => {
    test("It should respond with a 201 created", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunchData)
        .expect("Content-type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(requestDate).toBe(requestDate);
    });
    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithoutDate)
        .expect("Content-type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch properties/fields",
      });
    });
    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
