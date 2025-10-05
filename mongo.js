const mongoose = require("mongoose");

const args = process.argv.slice(2);
const [password, name, number] = args;
const argCount = args.length;

if (!password) {
  console.log("enter dbpassword argument");
  process.exit(1);
}

const url = `mongodb+srv://fullstackopen:${encodeURIComponent(
  password
)}@cluster0.x6snlds.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// Only dbpassword is as argument
// show all entries
if (argCount === 1) {
  console.log("phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else if (argCount === 2) {
  // missing personNumber
  console.log("For adding person you must enter personName and personNumber");
  process.exit(1);
} else if (argCount === 3) {
  const person = new Person({
    name,
    number,
  });

  person.save().then((result) => {
    console.log("person saved!");
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
