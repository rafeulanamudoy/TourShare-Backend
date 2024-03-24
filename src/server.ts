import mongoose from "mongoose";
import app from "./app";
import config from "./config";

const options = {
  autoIndex: true, //this is the code I added that solved it all
};
async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string, options);
    console.log(`database connect successfully`);
    app.listen(config.port, () => {
      console.log(` app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(`fail to connect the error is:${error}`);
  }
}
boostrap();
