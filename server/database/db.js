import mongoose from "mongoose";

const Connection = async (URL) => {
  // const URL = `mongodb://${username}:${password}@ac-41xgirb-shard-00-00.vp1wlb4.mongodb.net:27017,ac-41xgirb-shard-00-01.vp1wlb4.mongodb.net:27017,ac-41xgirb-shard-00-02.vp1wlb4.mongodb.net:27017/?ssl=true&replicaSet=atlas-oovwl9-shard-0&authSource=admin&retryWrites=true&w=majority&appName=sonuWebTech`;

  try {
    await mongoose.connect(URL, {
      // useNewUrlParser: true,
      //   useCreateIndex: true,
      //   useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with the Database", error);
  }
};
export default Connection;
