const express = require('express');
const cors = require('cors');
const carsRoute = require('./routes/cars-route');
const path = require('path');
const logger = require('morgan');

//! config
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

//! middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

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

module.exports = app;
