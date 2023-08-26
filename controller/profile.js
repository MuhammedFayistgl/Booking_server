import userModals from '../models/userModals.js'


export const uplodprofileimg = async (req, res) => {

    const { filename } = req.file
    const url = filename
    const userExist = await userModals.findById({ _id: req.userID })

    if (userExist) {
        try {
            userExist.profileUrl = url
            await userExist.save()
        } catch (err) {
            console.log(err);
        }

    }
}