const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json());

app.use('/users', userRoutes);

connectDB();

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server listening on the port ${PORT}`);
});