const express = require('express');
const { getAllCars, getCarsById, createCar, updateCar, deleteCar } = require('../controllers/cars-controller');

const router = express.Router();

router.get('/', getAllCars);
router.get('/:id', getCarsById);
router.post('/', createCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

module.exports = router;
