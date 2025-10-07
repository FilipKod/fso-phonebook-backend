require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.status(200).json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      console.log(person);
      if (person) {
        response.status(200).json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name) {
    return response.status(400).json({ error: "name is missing" });
  }

  if (!number) {
    return response.status(400).json({ error: "number is missing" });
  }

  Person.findOne({ name })
    .then((person) => {
      if (person) {
        return response.status(409).json({ error: "name is already exists" });
      } else {
        const createPerson = new Person({
          name,
          number,
        });

        createPerson
          .save()
          .then((person) => {
            response.status(201).json(person);
          })
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { number } = request.body;

  if (!number) return response.status(422).json({ error: "missing number" });

  Person.findByIdAndUpdate(
    request.params.id,
    {
      number,
    },
    { new: true }
  ).then((updatedPerson) => {
    return response.status(202).json(updatedPerson);
  });
});

app.get("/info", (request, response) => {
  const actualTimeDate = new Date();
  let infoHtml = `<p>Phonebook has info for ${persons.length} people.</p>`;
  infoHtml += `<p>${actualTimeDate}</p>`;
  response.send(infoHtml);
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
