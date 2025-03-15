import admin from '../config/firebaseConfig.js';
import User from '../models/userModal.js'

export const getUserProfile = async (req, res) => {
  const { uid } = req.query;

  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const { uid, displayName, photoURL } = req.body;

  try {
    const updatedUser = await admin.auth().updateUser(uid, { displayName, photoURL });

    await User.findOneAndUpdate({ uid }, { displayName, photoURL }, { new: true });

    res.json({ user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const currentUserProfile = async (req, res) => {
  try {
    const {uid}   = req.user;
    const firebaseUser = await admin.auth().getUser(uid)
      .catch(error => {
        throw new Error('User not found in Firebase');
      });

    const dbUser = await User.findOne({ uid: uid });

    if (!dbUser) {
      return res.status(404).json({
        error: 'User not found in database',
        status: 404,
        success: false
      });
    }

    const userInfo = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      emailVerified: firebaseUser.emailVerified,
      displayName: dbUser.displayName || firebaseUser.displayName,
      photoURL: dbUser.photoURL || firebaseUser.photoURL,
      phoneNumber: firebaseUser.phoneNumber,
      createdAt: firebaseUser.metadata.creationTime,
      // lastLoginAt: firebaseUser.metadata.lastSignInTime,
    };

    res.status(200).json({
      data: {
        user: userInfo
      },
      message: 'User information retrieved successfully',
      status: 200,
      success: true
    });

  } catch (error) {
    console.log('errror',error)
    const errorResponse = {
      status: 401,
      success: false,
      error: 'Authentication failed'
    };

    if (error.message === 'Invalid or expired token') {
      errorResponse.error = 'Invalid or expired authentication token';
    } else if (error.message === 'User not found in Firebase') {
      errorResponse.error = 'User not found';
      errorResponse.status = 404;
    }

    res.status(errorResponse.status).json(errorResponse);
  }
};