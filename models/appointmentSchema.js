import mongoose from "mongoose";
import Mongoose from "mongoose";
import validator from "validator";



const appointmentSchema = new Mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, 'First name must be at least 3 characters!']
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, 'Last name must be at least 3 characters!']
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Please provide a valid email!']
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, 'phone number must be at least 10 digits'],
        maxLength: [10, 'phone number must be at least 10 digits']
    },
    nic: {
        type: String,
        required: true,
        minLength: [13, 'NIC must contain exact 13 digits'],
        maxLength: [13, 'NIC must contain exact 13 digits']
    },
    dob: {
        type: Date,
        required: [true, "date of birth is required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },
    appointment_date: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    doctor: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    hasVisited: {
        type: Boolean,
        required: true,
        default: false,
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    }
});


export const Appointment = Mongoose.model('Appointment', appointmentSchema)
