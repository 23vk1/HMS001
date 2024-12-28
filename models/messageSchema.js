import Mongoose from "mongoose";
import validator from "validator";


const messageSchema = new Mongoose.Schema({
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
    message: {
        type: String,
        required: true,
        minLength: [10, 'Message must contain at least 10 characters!'],
    },
})


export const Message = Mongoose.model('Message', messageSchema)