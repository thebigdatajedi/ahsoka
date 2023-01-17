var express = require('express');
const router = express.Router(), appointmentController = require('../../controllers/appointments'),
    // slotController = require('../../controllers/slot');
    slotController = require('../../controllers/slots');
router.get('/appointments', appointmentController.all);
router.get('/retrieveSlots', slotController.all);
router.post('/appointmentCreate', appointmentController.create);
module.exports = router;