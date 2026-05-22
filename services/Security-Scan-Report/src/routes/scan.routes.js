const router = require('express').Router();
const { scanWebsite } = require('../controllers/scan.controller');

// Esta ruta es realmente /api/scan/
router.post('/', scanWebsite);

module.exports = router;