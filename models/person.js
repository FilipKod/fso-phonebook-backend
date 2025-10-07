const mongose = require("mongoose");
const url = process.env.MONGODB_URI;

mongose.set("strictQuery", false);

mongose
  .connect(url)
  .then((response) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error to connect MongoDB", error.message);
  });

const personSchema = new mongose.Schema({
  name: {
    type: String,
    minLength: [3, "User must contain at least 3 characters"],
    required: true,
  },
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnendObject) => {
    returnendObject.id = returnendObject._id.toString();
    delete returnendObject.__v;
    delete returnendObject._id;
  },
});

module.exports = mongose.model("Person", personSchema);
