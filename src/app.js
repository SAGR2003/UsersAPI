const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');

app.use(express.json());

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

const mongoURI = 'mongodb+srv://admin:4Rc9Sn6OCz5S7Mcv@marketplace.yp9n9dg.mongodb.net/?retryWrites=true&w=majority&appName=MarketPlace';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connection to MongoDB Succesful!'))
.catch(err => console.error('Connection error to MongoDB:', err));


app.listen(PORT, () => {
  console.log(`Server listening on the port ${PORT}`);
});