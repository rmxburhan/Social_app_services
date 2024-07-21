import mongoose from "mongoose";

const initDB = () => {
  mongoose
    .connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/social_media_test"
    )
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log("Connect to database failed"));
};

export default initDB;
