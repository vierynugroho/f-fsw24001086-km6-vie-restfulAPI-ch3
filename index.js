const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const carsRoute = require('./routes/cars-route');
const path = require('path');

//! config
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.static(path.join(__dirname, 'public')));

//! middleware
app.use(cors());
app.use(express.json());

//! route
app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Ping Successfully',
	});
});

app.use('/cars', carsRoute);

app.use((req, res) => {
	res.status(404).json({
		status: 'NOT FOUND',
		message: '404 - Page Not Found',
	});
});

app.listen(PORT, () => {
	console.log(`Yohoo! running in http://localhost:${PORT}`);
});
