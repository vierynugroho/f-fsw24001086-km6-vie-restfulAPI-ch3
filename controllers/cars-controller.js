const carInputValidation = require('../middlewares/carInputValidation');
const { getAll, getById, insertCar, putCar, destroyCar } = require('../models/cars-model');

const getAllCars = async (req, res) => {
	try {
		const cars = await getAll();

		res.status(200).json({
			status: 'OK',
			message: 'GET all cars success!',
			length: cars.length,
			data: cars,
		});
	} catch (error) {
		res.status(500).json({
			status: 'FAIL',
			message: `${error}`,
		});
	}
};

const getCarsById = async (req, res) => {
	try {
		const id = req.params.id;
		const car = await getById(id);

		res.status(200).json({
			status: 'OK',
			message: 'GET car success!',
			data: car,
		});
	} catch (error) {
		res.status(404).json({
			status: 'NOT FOUND',
			message: error.message,
		});
	}
};

const createCar = async (req, res) => {
	try {
		const data = req.body;

		//! validation middleware
		carInputValidation('post', data);

		const car = await insertCar(data);

		res.status(201).json({
			status: 'OK',
			message: 'CREATE car success!',
			data: car,
		});
	} catch (error) {
		res.status(400).json({
			status: 'FAIL',
			message: error.message,
		});
	}
};

const updateCar = async (req, res) => {
	try {
		const id = req.params.id;
		const data = req.body;

		//! validation middleware
		carInputValidation('put', data);

		const car = await putCar(id, data);

		res.status(200).json({
			status: 'OK',
			message: 'UPDATE car success!',
			data: car,
		});
	} catch (error) {
		res.status(400).json({
			status: 'FAIL',
			message: error.message,
		});
	}
};

const deleteCar = async (req, res) => {
	try {
		const id = req.params.id;
		await destroyCar(id);

		res.status(200).json({
			status: 'OK',
			message: 'DELETE car success!',
		});
	} catch (error) {
		res.status(400).json({
			status: 'FAIL',
			message: error.message,
		});
	}
};

module.exports = {
	getAllCars,
	getCarsById,
	createCar,
	updateCar,
	deleteCar,
};
