import express from 'express';
import cookieParser from 'cookie-parser';

// Import routes
import userRouter from '../routes/user.routes.js';
import authRouter from '../routes/auth.routes.js';
import subscriptionRouter from '../routes/subscription.routes.js';
import workflowRouter from '../routes/workflow.routes.js';

// Import middlewares and database connection
import connectToDatabase from '../database/mongodb.js';
import errorMiddleware from '../middlewares/error.middleware.js';
import arcjetMiddleware from '../middlewares/arcjet.middleware.js';

// Initialize database connection when the module is imported
// This helps with connection caching in serverless environments
connectToDatabase().catch(console.error);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Subscription Tracker API!');
});

// Error handling middleware (should be last)
app.use(errorMiddleware);

// Export the Express API for Vercel
export default app;