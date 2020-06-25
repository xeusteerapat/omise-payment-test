import React from 'react';
import Script from 'react-load-script';

const Payment = () => {
  let OmiseCard;
  const handleLoadScript = () => {
    OmiseCard = window.OmiseCard;
    console.log(OmiseCard);

    OmiseCard.configure({
      publicKey: process.env.REACT_APP_OMISE_PUBLIC_KEY,
      currency: 'thb',
      frameLabel: 'Rider',
      submitLabel: 'PAY NOW',
      buttonLabel: 'Pay with Omise',
    });
  };

  const creditCardConfig = () => {
    OmiseCard.configure({
      defaultPaymentMethod: 'credit_card',
      otherPaymentMethods: [],
    });

    OmiseCard.configureButton('#credit-card', {
      publicKey: process.env.REACT_APP_OMISE_PUBLIC_KEY,
      amount: 10000,
      frameLabel: 'Merchant Name',
      submitLabel: 'Pay',
    });

    OmiseCard.attach();
  };

  const omiseCardHandler = () => {
    OmiseCard.open({
      amount: 10000,
      submitFormTarget: '#checkout-form',
      onCreateTokenSuccess: nonce => {
        /* Handler on token or source creation.  
        Use this to submit form or send ajax request to server */
        console.log(nonce);
      },
      onFormClosed: () => {
        /* Handler on form closure. */
      },
    });
  };

  const handlePayment = e => {
    e.preventDefault();
    creditCardConfig();
    omiseCardHandler();
  };

  return (
    <div>
      <Script url='https://cdn.omise.co/omise.js' onLoad={handleLoadScript} />
      <form>
        <input type='hidden' name='omiseToken' />
        <input type='hidden' name='omiseSource' />
        <button type='button' id='credit-card' onClick={handlePayment}>
          Checkout
        </button>
      </form>
    </div>
  );
};

export default Payment;
