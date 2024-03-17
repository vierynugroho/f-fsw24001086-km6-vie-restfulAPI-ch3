const { getAll } = require('../models/cars-model');

const carInputValidation = (method, data) => {
	const requireFields = ['plate', 'manufacture', 'model', 'image', 'rentPerDay', 'capacity', 'availableAt', 'transmission', 'available', 'type', 'year'];
	const extensionImage = ['jpg', 'jpeg', 'png'];
	const getExtension = data.image.split('.').pop().toLowerCase();

	for (const field of requireFields) {
		if (!data[field] && method != 'put') {
			throw Error(`Missing required field ${field}`);
		} else if (!extensionImage.includes(getExtension)) {
			throw Error(`Invalid image extension! valid Extension: ${extensionImage}`);
		} else if (getAll().some((car) => car.plate === data.plate)) {
			throw Error(`Plate number cannot be the same!`);
		}
	}
};

module.exports = carInputValidation;
