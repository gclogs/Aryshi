import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: '.env' })

let db: mongoose.Connection;

class mongoDB {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  conn() {
    if (db) return;
    const { DATABASE_URL } = process.env;

    mongoose.set("strictQuery", false);
    
    mongoose.Promise = global.Promise;
    mongoose.connect(DATABASE_URL);

    db = mongoose.connection;
    
    db.once('open', async () => {
      console.log('Successfully connected to mongodb');
    });

    db.on('error', () => {
      console.log(`Error connecting to databsae. Check Whether mongoDB
      installed or you can try to give opensource Mongo Atlas database`);
    });

    return {}
  }

  disconn() {
    if (!db) {
      return;
    }
    mongoose.disconnect();
  }
}

export default mongoDB;