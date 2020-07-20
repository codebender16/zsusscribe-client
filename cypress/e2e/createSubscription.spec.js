import { subscriptionBuilder } from "../support/generate"

describe("when adding text to make a new subscription", () => {
  it.only("should be able to submit the form and be redirected to the /subscriptions page", () => {
    cy.getUser().then((user) => {
      cy.login(user.email, user.password)
      const { name, payment_amount, payment_date, reminder, expiry_date } = subscriptionBuilder()
      cy.visit("/subscriptions/create");
      cy.typeInSubscriptionDetails(name, payment_amount, payment_date, reminder, expiry_date)
      cy.get('form').submit()
      .url()
      .should('eq', 'http://localhost:8080/subscription')
    })
  });
});