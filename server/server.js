const express = require('express');
const cors = require('cors');
require('dotenv').config();

const omise = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

const app = express();

app.use(express.json());
app.use(cors());

const createCharge = async (req, res, next) => {
  try {
    const customer = await omise.customers.create({
      email: 'john.doe@example.com',
      description: 'John Doe (id: 30)',
      card: 'tokn_test_5kbz2z7po6ujhcmuqze',
    });

    const charged = await omise.charges.create({
      amount: 10000,
      currency: 'thb',
      customer: customer.id,
    });
    console.log(charged);
  } catch (err) {
    console.log(err);
  }
};

createCharge();

app.post('/credit-card-checkout', createCharge);

app.listen(7000, () => {
  console.log('Server is listening on port 7000');
});
