const stripeCheckout = StripeCheckout.configure({
  key: "pk_live_6PNbLpgNB7WfedZ79APJKbXy",
  image: "https://files.stripe.com/files/f_live_ksb3aGpHjgXyJDw0FL5a7rRf",
  locale: "auto",
  token: function(token) {
    stripeToken.value = token.id
    stripeForm.submit()
  }
})

const app = new Vue({
  el: "#donate-box",
  data: {
    amount: 500,
    customAmount: null
  },
  methods: {
    checkout: function() {
      stripeCheckout.open({
        name: "Academus",
        description: `$${this.finalAmount() / 100} Donation`,
        zipCode: true,
        amount: this.finalAmount(),
        panelLabel: "Donate {{amount}}"
      })
    },
    finalAmount: function() {
      if(this.customAmount)
        return Math.round(this.customAmount * 100)
      else
        return this.amount
    }
  }
})

if(document.location.search === "?error")
  alert("Your donation could not be processed. Please try again.")