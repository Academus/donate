const express = require('express')
const bodyParser = require('body-parser')
const app = express()

var config

try {
  config = require('./config.json')
} catch(e) {
  config = process.env
}

const stripe = require('stripe')(config.STRIPE_SECRET_KEY)

app.use(express.static("public", { extensions: [ "html" ] }))
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/donate", async (req, res) => {
  try {
    const charge = stripe.charges.create({
      amount: req.body.amount,
      currency: "usd",
      source: req.body.stripeToken,
      description: "Academus donation"
    })
  } catch(e) {
    res.redirect("/?error")
    return
  }

  res.redirect("/thanks")
})

app.listen(process.env.PORT || 3000)