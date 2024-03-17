const express = require('express');
const { getAllCars, getCarsById, createCar, updateCar, deleteCar } = require('../controllers/cars-controller');

const router = express.Router();

router.route('/').get(getAllCars).post(createCar);
router.route('/:id').get(getCarsById).put(updateCar).delete(deleteCar);

module.exports = router;
