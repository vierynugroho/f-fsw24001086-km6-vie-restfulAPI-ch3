const fs = require('fs');
const { randomUUID } = require('crypto');
const { writeFile } = require('../services/write-file');
const { carAvailableAt } = require('../services/generate-availableAt');

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

	//! insert custom data to data req body
	data.id = randomUUID();

	//? Uncomment the code below if you want it to be availableAt auto generate
	// data.availableAt = carAvailableAt;

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
