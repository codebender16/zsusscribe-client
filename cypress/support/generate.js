import { build, fake } from '@jackfranklin/test-data-bot'

const userBuilder = build('User', {
  fields: {
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password())
  }
})

const subscriptionBuilder = build('Subscription', {
  fields: {
    name: fake((f) => f.company.companyName()),
    payment_amount: fake((f) => f.finance.amount()),
    payment_date: fake((f) => f.date.future()),
    reminder: `${Math.floor(Math.random() * 30)} days`,
    expiry_date: fake((f) => f.date.future())
  }
})

export {
  userBuilder,
  subscriptionBuilder
}