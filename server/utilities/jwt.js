import jwt from 'jsonwebtoken';

const generateAccessToken = (username) => {
    return jwt.sign({username}, process.env.TOKEN_SECRET, { expiresIn: '60h' });
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
}

export { generateAccessToken, authenticateToken }