const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

const YOUR_DOMAIN = "http://localhost:3000";

module.exports = (app) => {
  app.post("/create-checkout-session", requireLogin, async (req, res) => {
    const userId = req.user._id.toString();
    const product = await stripe.products.create({ name: "Credits" });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 2000,
      currency: "usd",
    });
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      metadata: { userId: userId },
    });

    res.redirect(303, session.url);
  });
};
