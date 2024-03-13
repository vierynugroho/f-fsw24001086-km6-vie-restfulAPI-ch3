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
			status: 500,
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
		res.status(500).json({
			status: 500,
			message: `${error}`,
		});
	}
};

const createCar = async (req, res) => {
	try {
		const data = req.body;
		const car = await insertCar(data);

		res.status(201).json({
			status: 'CREATED',
			message: 'CREATE car success!',
			data: car,
		});
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: `${error}`,
		});
	}
};
const updateCar = async (req, res) => {
	try {
		const id = req.params.id;
		const data = req.body;
		const car = await putCar(id, data);

		res.status(201).json({
			status: 'UPDATED',
			message: 'UPDATE car success!',
			data: car,
		});
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: `${error}`,
		});
	}
};
const deleteCar = async (req, res) => {
	try {
		const id = req.params.id;
		await destroyCar(id);

		res.status(200).json({
			status: 'DELETED',
			message: 'DELETE car success!',
		});
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: `${error}`,
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
