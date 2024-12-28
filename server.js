import app from './app.js';
import cloudinary from 'cloudinary';


cloudinary.v2.config({
    cloud_name: process.env.CLUDINARY_CLOUD_NAME,
    api_secret: process.env.CLUDINARY_API_SECRET,
    api_key: process.env.CLUDINARY_API_KEY,
})



app.listen(process.env.PORT, () => {
    console.log('Server is running on port 4000');
})