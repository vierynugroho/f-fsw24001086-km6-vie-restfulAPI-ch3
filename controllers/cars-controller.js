const { getAll, getById, insertCar, putCar } = require('../models/cars-model');

const getAllCars = async (req, res) => {
	try {
		const cars = await getAll();

		res.status(200).json({
			status: 200,
			message: 'GET all cars success',
			data: cars,
		});
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: `Error: ${error}`,
		});
	}
};

const getCarsById = async (req, res) => {
	try {
		const id = req.params.id;
		const car = await getById(id);

		if (!car) {
			res.status(404).json({
				status: 404,
				message: 'Car not found',
			});
		} else {
			res.status(200).json({
				status: 200,
				message: 'GET car success',
				data: car,
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: `Error: ${error}`,
		});
	}
};

const createCar = async (req, res) => {
	try {
		const data = req.body;
		const car = await insertCar(data);

		res.status(201).json({
			status: 201,
			message: 'CREATE car success',
			data: car,
		});
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: `Error: ${error}`,
		});
	}
};
const updateCar = async (req, res) => {
	try {
		const id = req.params.id;
		const data = req.body;
		const car = await putCar(id, data);

		res.status(201).json({
			status: 201,
			message: 'UPDATE car success',
			data: car,
		});
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: `Error: ${error}`,
		});
	}
};
const deleteCar = async (req, res) => {};

module.exports = {
	getAllCars,
	getCarsById,
	createCar,
	updateCar,
	deleteCar,
};
