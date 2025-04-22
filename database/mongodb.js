import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';


if(!DB_URI) {
  throw new Error('Please set the DB_URI environment variable');
}

const connectToDatabase = async () => {
  try {

    await mongoose.connect(DB_URI);

    console.log(`MongoDB connected in ${NODE_ENV} mode`);

  } catch (error) {

    console.error('MongoDB connection failed:', error);

    process.exit(1);
  }
};

export default connectToDatabase;
