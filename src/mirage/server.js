// src/mirage/server.js
import { createServer, Model, Factory } from "miragejs";
import { faker } from "@faker-js/faker";

export default function makeServer() {
  return createServer({
    models: {
      run: Model,
    },

    factories: {
      run: Factory.extend({
        id(i) {
          return i + 1;
        },
        name() {
          return faker.person.fullName();
        },
        status() {
          return faker.helpers.arrayElement([
            "Success",
            "Failed",
            "In Progress",
          ]);
        },
        date() {
          return faker.date
            .between({ from: "2023-01-01", to: Date.now() })
            .toISOString();
        },
        description() {
          return faker.lorem.sentence();
        },
        duration() {
          return faker.number.int({ min: 5, max: 120 });
        },
      }),
    },

    seeds(server) {
      server.createList("run", 50);
    },

    routes() {
      this.namespace = "api";
      this.get("/runs", (schema) => schema.runs.all());
      this.get("/runs/:id", (schema, request) =>
        schema.runs.find(request.params.id)
      );
    },
  });
}
