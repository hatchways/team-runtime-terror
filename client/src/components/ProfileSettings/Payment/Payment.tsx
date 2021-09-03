import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const publishableKey =
  'pk_test_51JRxZpFPiYWgYJZZYkfNjn42WcxdB1sRdCjm2rHd8IHu5PK2S1xRGA493brmlOGT8qfsbwTSHHbMCDetADwyyWSO003lEM8vz2';
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
