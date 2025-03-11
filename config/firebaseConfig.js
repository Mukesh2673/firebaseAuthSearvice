import admin from 'firebase-admin';
import dotenv from 'dotenv';
import ServiceAccountKey from './serviceAccountKey.json' assert { type: 'json' };

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(ServiceAccountKey),
});

export default admin;
