const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
// Replace this endpoint secret with your endpoint's unique secret
// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks
const endpointSecret =
  "whsec_8c86115078b8832c490a51c82e4e18980f6de6fd69ee4c264cfca4034d4d044d";
const express = require("express");

module.exports = (app) => {
  app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (request, response) => {
      let event = request.body;
      // Only verify the event if you have an endpoint secret defined.
      // Otherwise use the basic event deserialized with JSON.parse
      if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = request.headers["stripe-signature"];
        try {
          event = stripe.webhooks.constructEvent(
            request.body,
            signature,
            endpointSecret
          );
        } catch (err) {
          console.log(
            `⚠️  Webhook signature verification failed.`,
            err.message
          );
          return response.sendStatus(400);
        }
      }

      // Handle the event
      switch (event.type) {
        case "checkout.session.completed":
          // Then define and call a method to handle 'checkout.session.completed'.
          const userId = event.data.object.metadata.userId;
          console.log(`PaymentIntent was successful!`);
          const user = await User.findOne({ _id: userId });
          user.credits += 20;
          await user.save();
          break;
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event.type}.`);
      }

      // Return a 200 response to acknowledge receipt of the event
      response.send();
    }
  );
};
