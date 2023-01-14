import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
mongoose.set("strictQuery", false);
const uri = process.env.MONGODB_URI;

const connectMongo = async () => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.error(error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});
mongoose.connection.on("error", (error) => {
  console.log("MongoDB connection error: ", error);
});
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose connection closed due to NodeJs process termination");
  process.exit(0);
});

export default connectMongo;
