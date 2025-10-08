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
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (value) => {
        return /\d{2,3}-\d*$/.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnendObject) => {
    returnendObject.id = returnendObject._id.toString();
    delete returnendObject.__v;
    delete returnendObject._id;
  },
});

module.exports = mongose.model("Person", personSchema);
