import { app } from "./app";
import connectDB from "./db";

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });

    server.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed: ", error);
  });
