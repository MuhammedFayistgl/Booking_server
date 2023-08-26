import jwt from 'jsonwebtoken'

export const genarateToken = (id) =>{
    return jwt.sign({id},process.env.SECRET_KEY , {expiresIn: '30d'} )
}