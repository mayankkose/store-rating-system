require('dotenv').config();

const app = require('./app');
const sequelize = require('./config/db');
require('./models');
const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Database Connected');

    app.listen(PORT, () => {
      console.log(`Server Running On Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });