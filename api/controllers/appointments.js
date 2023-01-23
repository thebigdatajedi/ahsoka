// const { Appointment, Slot } = Model;
const { Appointment, Slot } = require("../models");
const { Vonage } = require('@vonage/server-sdk');
const appointmentController = {
  all(req, res) {
    // Returns all appointments
    Appointment.find({}).exec((err, appointments) => res.json(appointments));
  },
  create(req, res) {
    var requestBody = `req.body;`
    var newslot = new Slot({
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      created_at: Date.now()
    });
    newslot.save();
    // Creates a new record from a submitted form
    var newappointment = new Appointment({
      name: requestBody.name,
      email: requestBody.email,
      phone: requestBody.phone,
      slots: newslot._id
    });
    const vonage = new Vonage({
      apiKey: "14b6a2aa",
      apiSecret: "h@d@l1fodI5S"
    })
    let msg =
      requestBody.name +
      " " +
      "this message is to confirm your appointment at" +
      " " +
      requestBody.appointment;
    // // and saves the record to
    // // the data base
    newappointment.save((err, saved) => {
      // Returns the saved appointment
      // after a successful save
      Appointment.find({ _id: saved._id })
        .populate("slots")
        .exec((err, appointment) => res.json(appointment));
      const from = "13312473389"
      const to = "18013727577"
      const text = 'A text message sent using the Vonage SMS API'

      async function sendSMS() {
        await vonage.sms.send({to, from, text})
            .then(resp => { console.log('Message sent successfully'); console.log(resp); })
            .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
      }
      sendSMS();
    });
  }
};
module.exports = appointmentController;