const request = require("supertest");
const server = require("../data/server");
const db = require("../data/dbConfig");

describe("Server setup", () => {
  test("Environment setup", async () => {
    const response = await request(server).get("/");
    expect(process.env.DB_ENV).toBe("testing");
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ api: "Up and running..." });
  });
});

describe("Animal Routes", () => {
  beforeEach(async () => {
    // re-runs the seeds and starts with fresh database of our seeds
    await db.seed.run();
  });

  it("GET /", async () => {
    const response = await request(server).get("/animals");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(4);
    expect(response.type).toBe("application/json");
  });

  it("GET /:id (valid)", async () => {
    const response = await request(server).get("/animals/1");
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe("Tony");
    expect(response.body.species).toBe("Tiger");
    expect(response.body.age).toBe(0.5);
  });

  it("GET /:id (invalid)", async () => {
    const response = await request(server).get("/animals/999");
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Animal does not exist" });
  });

  it("DELETE /:id (valid)", async () => {
    const response = await request(server).delete("/animals/1");
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.message).toBe("DELETED");
  });

  it("DELETE /:id (invalid)", async () => {
    const response = await request(server).delete("/animals/999");
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Animal does not exist" });
  });

  it("POST /", async () => {
    const animal = { name: "Harambe", species: "Gorilla", age: 17 };
    const response = await request(server).post("/animals").send(animal);
    expect(response.statusCode).toBe(201);
    /*
     *expect(response.body).toEqual({ ...animal, id: 5 });
     */
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("Harambe");
    expect(response.body.species).toBe("Gorilla");
    expect(response.body.age).toBe(17);
  });
});
