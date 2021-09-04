import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const publishableKey = 'pk_test_DdPKckGX6of2znt85K6mN4Rc004w0QZ6xK';
const secretKey =
  'sk_test_51JRxZpFPiYWgYJZZugTr2FQgaDSP4DteMbWkJnZHS4rjFzL9fjVIclsS7GQ9oYs7efIFEhdxsTIchDn96GPNmJZR00redEJubU';

const stripeTestPromise = loadStripe(publishableKey as string);

const Payment = (): JSX.Element => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
