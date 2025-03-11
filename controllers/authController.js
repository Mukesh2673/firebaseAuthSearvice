// import admin from '../config/firebaseConfig.js';
import admin from '../config/firebaseConfig.js'
import User from '../models/userModal.js'
export const signUpWithEmail = async (req, res) => {
  const { email, password, displayName } = req.body;

  try {
    const userRecord = await admin.auth().createUser({ email, password, displayName });

    const newUser = new User({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
    });

    await newUser.save();

    res.status(201).json({ user: userRecord });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const googleSignIn = async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    let user = await User.findOne({ uid: decodedToken.uid });

    if (!user) {
      user = new User({
        uid: decodedToken.uid,
        email: decodedToken.email,
        displayName: decodedToken.name,
        photoURL: decodedToken.picture,
      });
      await user.save();
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid Google token' });
  }
};
