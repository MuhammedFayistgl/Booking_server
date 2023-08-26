
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import adminModal from "../models/adminModel.js";



export const signupadmin = async (req, res) => {

    const { username, email, password } = req.body;
    if (!username && !email && !password) {
        return res.status(200).json({ message: "please enter all fields" });
    } else {
        const HashPassword = bcrypt.hashSync(password, 10);
        try {
            const newadmin = await new adminModal({
                username,
                email,
                password: HashPassword,
            }).save();

            const adminID = newadmin._id;
            const Token = Jwt.sign({ adminID }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.cookie("token", String(Token), { maxAge: 3600000 })
            res.status(200).json({
                statuscode: 0,
                status: true,
                message: "Registration succuss fully",
                adminID: adminID
            });
            console.log('admin Registration succuss');
            console.log(`admin ID: ${newadmin._id}`);

        } catch (error) {
            console.error("server err", error);
        }
    }
}
