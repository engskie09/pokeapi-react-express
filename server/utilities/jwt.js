import jwt from 'jsonwebtoken';

const generateAccessToken = (username) => {
    return jwt.sign({username}, process.env.TOKEN_SECRET, { expiresIn: '60h' });
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, (error, payload) => {
      if (error) return res.sendStatus(403)
      req.payload = payload
  
      next()
    })
}

export { generateAccessToken, authenticateToken }