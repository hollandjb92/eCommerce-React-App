const express = require("express"),
  cors = require("cors"),
  path = require("path"),
  app = express(),
  PORT = process.env.PORT || 5000;


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
};

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

//Cross origin request - able to make cross origin requests to backend server
app.use(cors());


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
  })
}

app.post('/payment', (req, res) => {

  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd"
  };


  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({
        error: stripeErr
      });
    } else {
      res.status(200).send({
        success: stripeRes
      });
    }
  });
});



app.listen(PORT, console.log(`Server running on PORT ${PORT}`));