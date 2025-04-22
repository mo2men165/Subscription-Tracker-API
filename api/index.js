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

// Pre-connect to database when the module is loaded
// This helps with cold starts
connectToDatabase().catch(err => console.error("Initial DB connection failed:", err));

// Create Express app
const app = express();

// Middleware - keep it minimal for performance
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Don't use arcjetMiddleware for now to test if it's causing timeouts
// app.use(arcjetMiddleware);  

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

// Export the app
export default app;