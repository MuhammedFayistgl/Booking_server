import adminModal from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";


export const loginAdmin = async (req, res) => {



    const { email, password } = req.body;


    const adminExist = await adminModal.find({ email: email });

    if (adminExist == []) {
        console.log('your email not registered ! please register');
        return res.status(403).json({ message: 'your email not registered ! please register' });
    }
    else if (!adminExist[0].password) {
        return res.status(401).json({ message: "Invalid Email , please enter a valid email or register with the email" });
    }
    else {
        const MachPassword = bcrypt.compareSync(password, adminExist[0].password);
        console.log("MachPassword", MachPassword);
        const adminID = adminExist[0]._id;
        console.log("adminID", adminID);
        const Token = Jwt.sign({ adminID }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).cookie("token", String(Token), { maxAge: 3600000 })
        res.json({
            message: "login Succuss fully", errorcode: 0, status: true,
            adminID: adminID,
        })
    }


}