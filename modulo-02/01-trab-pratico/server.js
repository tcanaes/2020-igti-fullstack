const app = require('./app');

const server = app.listen(3000, () => {
  console.log(`App running on port 3000...`)
});