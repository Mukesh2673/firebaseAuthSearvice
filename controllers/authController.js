import admin from '../config/firebaseConfig.js'
import { genrateAuthToken } from '../middlewares/authmiddleware.js';
import User from '../models/userModal.js'
export const signUpWithEmail = async (req, res) => {
  const { email, password, displayName } = req.body;
  try {
    const userRecord = await admin.auth().createUser({ email, password, displayName });
    const {uid}=userRecord
    const newUser = new User({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
    });

    await newUser.save();
    if(userRecord){
      res.status(201).json({ data: {email:email,uid:uid}, message:`${userRecord.displayName},your Account has been Registered successfully`,status:200,success:true});

    }
  } catch (error) {
    console.log("Perrror=>>>",error)
    res.status(400).json({ error: error.message,success:false,status:400 });
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

export const emailPasswordSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
        status: 400,
        success: false
      });
    }
    const userCredential = await admin.auth().getUserByEmail(email)
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          throw new Error('User not found');
        }
        throw error;
      });


    let user = await User.findOne({ uid: userCredential.uid });
    if (!user) {
      user = new User({
        uid: userCredential.uid,
        email: userCredential.email,
        displayName: userCredential.displayName || email.split('@')[0],
        photoURL: userCredential.photoURL || ''
      });
      await user.save();
    }
    const authToken =  await genrateAuthToken(user);
    // Return success response
    res.status(200).json({
      data: {
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        },
        authToken: authToken
      },
      message: 'Successfully signed in with email and password',
      status: 200,
      success: true
    });

  } catch (error) {
    // Handle specific error cases
    console.log("error is",error)
    const errorResponse = {
      status: 401,
      success: false,
      error: 'Invalid email or password'
    };

    if (error.message === 'User not found') {
      errorResponse.error = 'No account exists with this email';
      errorResponse.status = 404;
    } else if (error.code === 'auth/invalid-email') {
      errorResponse.error = 'Invalid email format';
      errorResponse.status = 400;
    }

    res.status(errorResponse.status).json(errorResponse);
  }
};
