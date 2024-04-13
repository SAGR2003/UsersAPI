const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

connectDB();

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server listening on the port ${PORT}`);
});