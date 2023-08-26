import BookingUserModel from '../models/BookinguserModel.js';
import apiModals from '../models/apiModal.js'
import userModals from '../models/userModals.js'
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
export const bockingHandler = async (req, res) => {

    const { Date, Time, orderdID, endDate, startDate,
        options, Email, FullName, Phone } = req.body.Booking_Data
 

    const itemExist = await apiModals.findById(orderdID)
    const itmBookExist = await BookingUserModel.findOne({ orderdID })

    if (!itemExist) {
        return res.status(200).json({
            errorcode: 1,
            status: true,
            orderstatus: false,
            message: 'your selected item Not found !'
        })
    }
    else if (itmBookExist) {
        return res.status(200).json({
            errorcode: 1,
            status: true,
            orderstatus: false,
            message: 'Your Booking  already  Reserved Please Choose a new Item'
        })
    }
    // else if (!userExist) {
    //     return res.status(200).json({
    //         errorcode: 1,
    //         status: true,
    //         orderstatus: false,
    //         message: 'Orderd user not registerd pleass register'
    //     })
    // } 
    else if (!req.userID) {
        return res.status(401).json({
            errorcode: 1,
            status: true,
            orderstatus: false,
            message: 'Please Register or Login'
        })
    } else {
        try {

         
            await new BookingUserModel({
                Date, Time, orderdID, userID:req.userID , endDate,
                startDate, options,  Email, FullName, Phone
            },{unique:false}).save()


            // let transporter = nodemailer.createTransport({
            //     service: "gmail",
            //     auth: {
            //         user: "muhammedfayisthangal@gmail.com",
            //         pass: "qanpljdjpijpatkc",
            //     },
            // });
            // transporter.sendMail(
            //     {
            //         from: "2muhammedfayisthangal@gmail.com", // sender address
            //         to: `${Email}`, // list of receivers
            //         subject: "Thank you for booking ", // Subject line
            //         text: `Your Booking id ${YourbookinID} `, // plain text body
            //     },

            //     (error, info) => {
            //         if (error) {
            //             console.log(error);
            //         } else {
            //             console.log(info.response);


            //         }
            //     }
            // );
            return res.status(200).json({
                errorcode: 0,
                status: false,
                orderstatus: true,
                message: 'Booking saved successfully'
            })

        } catch (error) {
            console.log(error);
        }

    }




};
export const getmyBooking = async (req, res) => {

    if (!req.userID) {
        return res.status(401).json({
            errorcode: 1,
            status: true,
            message: 'Please Register or Login'
        })

    } else {
        try {
            const Booked = await BookingUserModel.find({ userID: req.userID })
            if (!Booked) {
                return res.status(204).json({
                    errorcode: 1,
                    status: true,
                    message: 'Booked item not found in the database'
                })
            } else {
                return res.status(200).json({
                    errorcode: 0,
                    status: false,
                    message: 'Booked item found successfully',
                    data: Booked
                })
            }

        } catch (error) {
            console.error(error);
        }
    }
    console.log('req.userID', req.userID);
}

export const getuser = async (req, res, next) => {
    if (!req.userID) {
        return res.status(401).json({
            errorcode: 1,
            status: true,
            message: 'User not found please try again',
            data: false
        })
    } else {
        const userExist = await userModals.findOne({ _id: req.userID })
        return res.status(200).json({
            errorcode: 0,
            status: false,
            message: 'user fond succussFully',
            isLogdin: true,
            data: userExist
        })
    }


}

export const cancelOrder = async (req, res) => {
    const { orderID } = req.body


    try {
        if (!orderID) {
            return res.status(404).json({
                errorcode: 1,
                status: true,
                message: 'Booking item not found',
                data: false
            })
        } else {
            //  const BookingitmExist = await BookingUserModel.
            const BookingitmExist = await BookingUserModel.findOneAndDelete({ orderdID: orderID })
            console.log('BookingitmExist', BookingitmExist);
            return res.status(200).json({
                errorcode: 0,
                status: false,
                message: 'Booking item successfully deleted',
                data: BookingitmExist
            })
        }

    } catch (error) {
        throw new Error(error.message)
    }

}