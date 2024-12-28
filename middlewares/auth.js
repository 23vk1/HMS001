import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAdminAuthanticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler("Admin not Authanticated", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);
    if (req.user.role !== 'Admin') {
        return next(new ErrorHandler(`Role ${req.user.role} is not authorized to access this route`, 403));
    }
    next();
});

export const isPatientAuthanticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
        return next(new ErrorHandler("Patient not Authanticated", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);
    if (req.user.role !== 'Patient') {
        return next(new ErrorHandler(`Role ${req.user.role} is not authorized to access this route`, 403));
    }
    next();
})
