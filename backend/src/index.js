import 'dotenv/config';
import connectDB from "./db/index.js";
import { app } from "./app.js";

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.on("ERROR ", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed: ", err);
  });
