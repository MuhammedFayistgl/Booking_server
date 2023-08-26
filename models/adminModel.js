import mongoose from "mongoose";

const adminShema = mongoose.Schema({
    username: {
        type: 'string',
        required: [true, 'username required'],
    },
    email: {
        type: 'string',
        required: [true, 'email required'],
        unique: true,
    },
    password: {
        type: 'string',
        required: [true, 'password required'],
    }
})







const adminModal = mongoose.model('admins', adminShema);

export default adminModal