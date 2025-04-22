import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if (!DB_URI) {
  throw new Error('Please set the DB_URI environment variable');
}

// Cache the database connection between serverless function invocations
let cachedConnection = null;

const connectToDatabase = async () => {
  // If we already have a connection, use it
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('Using existing database connection');
    return;
  }

  try {
    // Set mongoose options for better serverless performance
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    // Connect to the database
    cachedConnection = await mongoose.connect(DB_URI, options);
    console.log(`MongoDB connected in ${NODE_ENV} mode`);
    
    return cachedConnection;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error; // Let the error handler manage this rather than exiting
  }
};

export default connectToDatabase;