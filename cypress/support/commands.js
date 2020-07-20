import '@testing-library/cypress/add-commands';

Cypress.Commands.add('getUser', () => {
  cy.fixture("user.json").then((user) => user)
})

Cypress.Commands.add("typeInLoginCredentials", (email, password) => {
  cy.findByLabelText(/email/i).type(email)
  cy.findByLabelText(/password/i).type(password)
})

Cypress.Commands.add("typeInSubscriptionDetails", (name, payment_amount, payment_date, reminder, expiry_date ) => {
  cy.findByLabelText(/Name/).type(name);
  cy.findByLabelText(/Payment Amount/).type(payment_amount);
  cy.findByLabelText(/Payment Date/).type(payment_date);
  cy.findByLabelText(/Reminder/).type(reminder);
  cy.findByLabelText(/Expiry Date/).type(expiry_date);
})

Cypress.Commands.add("login", (email, password) => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/login",
    body: { auth: { email, password }}
  })
  .then((response) => {
    localStorage.setItem("token", response.body.jwt)
  })
})