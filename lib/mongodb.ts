import mongoose from "mongoose";

const connectMongo = async () => {
  if (!global.mongooseConnection) {
    if (!process.env.MONGODB_URI) {
      throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
    }
    mongoose.set("strictQuery", false);
    global.mongooseConnection = await mongoose.connect(process.env.MONGODB_URI);
  }

  return global.mongooseConnection;
};

export default connectMongo;
