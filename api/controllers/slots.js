const {Appointment, Slot} = Model;
const slotController = {
    all (req, res) {
        // Returns all Slots
        Slot.find({})
            .exec((err, slots) => res.json(slots))
    }
};


export default slotController;