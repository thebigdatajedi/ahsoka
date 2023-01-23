// const {Appointment, Slot} = Model;
const {Appointment, Slot} = require('../models');
const slotController = {
  all (req, res) {
    // Returns all Slots
    Slot.find({})
        .exec((err, slots) => res.json(slots))
  }
};
module.exports = slotController;