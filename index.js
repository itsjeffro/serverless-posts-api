if (process.env.STAGE === 'local') {
  require("dotenv").config();
}

const app = require("./dist/app");

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${3000}`);
});
