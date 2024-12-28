import Mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const userSchema = new Mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password must be at least 8 characters!'],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"]
    },
    doctorDepartment: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String

    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (enteredPasssword) {
    return await bcrypt.compare(enteredPasssword, this.password);
}

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES });
};

export const User = Mongoose.model('User', userSchema)