import "dotenv/config";
import connectDB from "./db/index.ts";
import { app } from "./app.ts";

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
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
