import mongoose from 'mongoose';

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: 'HOSPITAL_MANAGEMENT_SYSTEM'
    }).then(() => {
        console.log('connected to database succesfully');
    }).catch((error) => {
        console.log('some error ocurred while connecting to database: ', error);

    })
}

