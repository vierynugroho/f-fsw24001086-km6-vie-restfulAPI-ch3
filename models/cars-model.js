const { randomUUID } = require('crypto');
const fs = require('fs');
const { writeFile } = require('../services/writeFile');

const getAll = () => {
	const cars = JSON.parse(fs.readFileSync('./public/data/cars.json', 'utf8'));
	return cars;
};

const getById = async (id) => {
	const cars = await getAll();
	const car = cars.find((car) => car.id === id);

	//! validation if not found
	if (!car) {
		throw Error('Car not found!');
	}

	return car;
};

const insertCar = async (data) => {
	const cars = await getAll();

	/**
	*
	//TODO: if availableAt auto generate
	// ! Generate availableAt
	 function getRandomInt(min, max) {
	 	min = Math.ceil(min);
	 	max = Math.floor(max);
	 	return Math.floor(Math.random() * (max - min + 1)) + min;
	 }

	 const now = new Date();
	 const isPositive = getRandomInt(0, 1) === 1;
	 const mutator = getRandomInt(1000000, 100000000);
	 const carAvailableAt = new Date(now.getTime() + (isPositive ? mutator : -1 * mutator));

	 //! insert custom data to data req body
	 data.availableAt = carAvailableAt;
	*/
	//! insert custom data to data req body
	data.id = randomUUID();

	const newCar = [...cars];
	newCar.push(data);

	writeFile('cars.json', newCar);

	return data;
};

const putCar = async (id, data) => {
	const cars = await getAll();
	const car = await getById(id);

	const updatedCar = { ...car, ...data };
	const updatedCars = cars.map((c) => (c.id === id ? updatedCar : c));

	writeFile('cars.json', updatedCars);

	return data;
};
const destroyCar = async (id) => {
	const cars = await getAll();
	//! validation
	await getById(id);

	const carsUnDeleted = cars.filter((car) => car.id !== id);
	writeFile('cars.json', carsUnDeleted);
};

module.exports = {
	getAll,
	getById,
	insertCar,
	putCar,
	destroyCar,
};
