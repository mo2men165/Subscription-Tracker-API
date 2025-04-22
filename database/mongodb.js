import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if (!DB_URI) {
  throw new Error('Please set the DB_URI environment variable');
}

// Cache the database connection
let cachedConnection = null;

const connectToDatabase = async () => {
  // If the connection is already established, reuse it
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  // Set shorter timeouts for serverless environments
  const options = {
    serverSelectionTimeoutMS: 5000, // 5 seconds (default is 30s)
    socketTimeoutMS: 10000, // 10 seconds
    connectTimeoutMS: 10000, // 10 seconds
    // These settings help with serverless function timeouts
    maxPoolSize: 10, // Limit connection pool size
    minPoolSize: 1,  // Keep at least one connection in the pool
  };

  try {
    if (mongoose.connection.readyState === 0) {
      cachedConnection = await mongoose.connect(DB_URI, options);
      console.log(`MongoDB connected in ${NODE_ENV} mode`);
    }
    
    return mongoose;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
};

export default connectToDatabase;