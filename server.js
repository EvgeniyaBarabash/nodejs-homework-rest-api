const mongoose = require("mongoose");
const app = require("./app");

const { PORT = 3000, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        `\nDatabase connection successful\nServer running. Use our API on port: ${PORT}\n`
      );
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
