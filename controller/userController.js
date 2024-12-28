import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js"
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js"
import cloudinary from "cloudinary"



export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, dob, gender, nic, role } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !dob || !gender || !nic || !role) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User aleady exists", 400));
    }

    user = await User.create({
        firstName, lastName, email, phone, password, dob, gender, nic, role
    });

    generateToken(user, "User Registred!", 200, res);
    // res.status(200).json({
    //     success: true,
    //     message: "User Registred!",
    // })
})


export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler(" Password and Confirm Password do not match", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }
    if (role !== user.role) {
        return next(new ErrorHandler("User with this role not found", 400));
    }
    generateToken(user, "User Logged in successfully!", 200, res);

})

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, dob, gender, nic } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !dob || !gender || !nic) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists!`, 400));
    }

    const admin = await User.create({ firstName, lastName, email, phone, password, dob, gender, nic, role: "Admin" })

    res.status(200).json({
        success: true,
        mesage: "New admin regisered"
    });
})

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors
    })
})

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    })
})

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", null, {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Admin Logged out successfully!"
    });
})
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patientToken", null, {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Patient Logged out successfully!"
    });
})


export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor avatar required!", 400));
    }

    const { docAvatar } = req.files;
    const allowedFormates = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
    if (!allowedFormates.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File formate not supported", 400));
    }
    const { firstName, lastName, email, phone, password, dob, gender, nic, doctorDepartment } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !dob || !gender || !nic || !doctorDepartment) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} aleady registered with this email!`, 400));
    }

    const coudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);

    if (!coudinaryResponse || coudinaryResponse.error) {
        console.log("Coudinary Error : ", coudinaryResponse.error || 'Unknown coudinary error');
    }
    const doctor = await User.create({
        firstName, lastName, email, phone, password, dob, gender, nic, doctorDepartment,
        role: 'Doctor',
        docAvatar: {
            public_id: coudinaryResponse.public_id,
            url: coudinaryResponse.secure_url
        }
    });
    res.status(200).json({
        success: true,
        message: "New Doctor Registered Successfully",
        doctor
    })

})
