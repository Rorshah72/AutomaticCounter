const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next()
    }

    try{

        const token  = req.headers.autherization.split(' ')[1] // " Bearer Token"

        if(!token) {
          return  res.status(401).json({message: "Не авторизований"})
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'),{expiresIn: '1h'})

        req.user = decoded

        return next()

    }catch (e) {

        res.status(401).json({message: "Не авторизований"})
    }
}