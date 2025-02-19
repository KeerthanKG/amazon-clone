const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// App configuration
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// API route and post request 
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request Received: ", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "aud",
  });
  console.log("Client Secrect Final: ", paymentIntent.client_secret);
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen Command
exports.api = functions.https.onRequest(app);
