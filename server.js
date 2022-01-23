require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT;
const HOST = process.env.HOST;
app.listen(PORT, () => {
  console.log(`App 🚀 is running on port ${HOST}:${PORT}`);
});
