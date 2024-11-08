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
          return faker.lorem.paragraphs();
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

      this.get("/runs", (schema, request) => {
        const skip = parseInt(request.queryParams.skip) || 0;
        const limit = parseInt(request.queryParams.limit) || 12;

        const startIndex = skip;
        const endIndex = skip + limit;

        const runs = schema.runs.all().slice(startIndex, endIndex).models;

        const totalCount = schema.runs.all().models.length;

        return { runs, totalCount };
      });

      this.get("/runs/:run_id", (schema, request) =>
        schema.runs.find(request.params.run_id)
      );
    },
  });
}
