import userModals from '../models/userModals.js'
import fs from 'fs'

export const fileExistimg = async (req, res, next) => {
    try {
        const userExist = await userModals.find()
        const images = fs.readdirSync('public/profile')
        images.filter((itm1) => {
            return userExist
                .map((itm2) => { return itm1 == !itm2.profileUrl })
        })
            .map((i) => { return fs.unlinkSync('public/profile/' + i) })
        next()

    } catch (err) { console.log(err); }




}