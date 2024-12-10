const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

// Enable CORS for all origins (adjust for production)
app.use(cors({origin: true}));

// Middleware to parse JSON requests
app.use(express.json());

// Basic route for testing the server
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from the server",
  });
});

// Route to create payment intent
app.post("/payment/create", async (req, res) => {
  try {
    const total = parseInt(req.query.total);

    // Validate total amount
    if (total <= 0) {
      return res.status(400).json({message: "Invalid total amount"});
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // Amount in cents
      currency: "usd", // Currency for the transaction
    });

    // Respond with the clientSecret for confirming payment on the frontend
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });

    // Log the payment intent for debugging (use logger in production)
    logger.info("PaymentIntent created:", paymentIntent);
  } catch (error) {
    // Log the error
    logger.error("Error creating payment intent:", error);
    res.status(500).json({message: "Internal Server Error"});
  }
});

// Export the API for Firebase Cloud Functions
exports.api = onRequest(app);
