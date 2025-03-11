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
