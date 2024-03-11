const axios = require('axios');
const fs = require('fs');

const getAll = () => {
	const cars = JSON.parse(fs.readFileSync('./public/data/cars.json', 'utf8'));
	return cars;
};

const getById = async (id) => {
	const cars = await getAll();
	const car = cars.find((car) => car.id === id);
	return car;
};

const insertCar = async (data) => {
	const cars = await getAll();

	const newCar = [...cars];
	newCar.push(data);
	fs.writeFileSync('./public/data/cars.json', JSON.stringify(newCar));

	return newCar;
};

const putCar = async (id, data) => {
	const cars = await getAll();
	const car = await getById(id);

	car.plate = data.plate;
	car.manufacture = data.manufacture;
	car.model = data.model;
	car.image = data.image;
	car.rentPerDay = data.rentPerDay;
	car.capacity = data.capacity;
	car.description = data.description;
	car.availableAt = data.availableAt;
	car.transmission = data.transmission;
	car.available = data.available;
	car.type = data.type;
	car.year = data.year;
	car.options = data.options;
	car.specs = data.specs;

	const updatedCar = [...cars];
	updatedCar.map((c) => (c.id === id ? car : c));
	fs.writeFileSync('./public/data/cars.json', JSON.stringify(updatedCar));
};

const destroyCar = async (id) => {};

module.exports = {
	getAll,
	getById,
	insertCar,
	putCar,
	destroyCar,
};
