const express = require("express");
const morgan = require("morgan");
const app = express();

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.status(200).json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.status(200).json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  if (!request.body.name) {
    return response.status(400).json({ error: "name is missing" });
  }

  if (!request.body.number) {
    return response.status(400).json({ error: "number is missing" });
  }

  const person = persons.find((p) => p.name === request.body.name);

  if (person) {
    return response.status(409).json({ error: "name is already exists" });
  }

  const maxId = Math.max(...persons.map((p) => p.id));

  const body = {
    id: String(maxId + 1),
    name: request.body.name,
    number: request.body.number,
  };

  persons = persons.concat(body);

  response.status(200).json(body);
});

app.get("/info", (request, response) => {
  const actualTimeDate = new Date();
  let infoHtml = `<p>Phonebook has info for ${persons.length} people.</p>`;
  infoHtml += `<p>${actualTimeDate}</p>`;
  response.send(infoHtml);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
