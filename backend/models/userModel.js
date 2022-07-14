import mongoose from "mongoose";

const userSChema = mongoose.Schema(
    {
        name: {type: String, required: true },
        email: {type: String, required: true, unique: true },
        password: {type: String, required: true },
        admin: {type: Boolean, default: false, required: true },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSChema);

export default User;