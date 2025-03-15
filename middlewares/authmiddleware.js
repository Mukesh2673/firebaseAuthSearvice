import admin from '../config/firebaseConfig.js';


import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'mukeshbhatt';
export const genrateAuthToken = (data)=>{
    const payload={_id:data._id, uid: data.uid, email: data.email}
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '12h' 
      });
} 



export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(403).json({ message: 'No token provided' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export const verifyJwtToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      error: 'No token provided',
      success: false,
      status: 401
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("docordddes",decoded)
    req.user = decoded;
    if (!decoded.uid) {
      return res.status(400).json({
        error: 'Invalid token: User ID not found',
        success: false,
        status: 400
      });
    }

    next(); 
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expired',
        success: false,
        status: 401
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token',
        success: false,
        status: 401
      });
    }
    res.status(500).json({
      error: 'Internal server error',
      success: false,
      status: 500
    });
  }
};



