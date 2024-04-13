const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://admin:4Rc9Sn6OCz5S7Mcv@marketplace.yp9n9dg.mongodb.net/marketplace?retryWrites=true&w=majority&appName=MarketPlace';

const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI);
		console.log('Connection Succesful to MongoDB');
	} catch (err) {
		console.error('Connection error to MongoDB:', err);
		process.exit(1);
	}
};

module.exports = connectDB;