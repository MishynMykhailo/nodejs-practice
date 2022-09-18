const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    const db = await connect(process.env.MONGODB_URI);
    const { port, host, name } = db.connection;
    console.log(
      `MongoDB connected on port ${port}, on ${host}, name - ${name}`.green
    );
  } catch (error) {
    console.log(`${error}`.red);
  }
};
module.exports = connectDB;
// const Cat = mongoose.model("Cat", { name: String });

// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));
