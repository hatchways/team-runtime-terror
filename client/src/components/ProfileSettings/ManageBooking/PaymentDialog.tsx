import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
} from '@material-ui/core';
import { createPaymentIntent } from '../../../helpers/APICalls/profile';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSnackBar } from '../../../context/useSnackbarContext';

interface Props {
  onClose: (value: string | undefined) => void;
  selectedValue: string | undefined;
  open: boolean;
}

const PaymentDialog = ({ onClose, selectedValue, open }: Props): JSX.Element => {
  const stripe = useStripe();
  const elements = useElements();
  const { updateSnackBarMessage } = useSnackBar();
  const options = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const handleClose = async (event: any) => {
    event.preventDefault();

    createPaymentIntent(event.target.name.value).then(async (result) => {
      await stripe
        ?.confirmCardPayment(result.paymentIntent.client_secret, {
          payment_method: {
            card: elements!.getElement(CardElement)!,
            billing_details: {
              name: event.target.name.value,
            },
          },
        })
        .then((payload) => {
          console.log(payload);
          updateSnackBarMessage('Payment successfull');
        });
    });

    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Confirm your payment !</DialogTitle>
      <DialogContent>
        <DialogContentText>To pay please enter the amount and click Pay !!</DialogContentText>

        <form id="my-form-id" onSubmit={handleClose}>
          <TextField autoFocus margin="dense" id="name" label="Enter the amount" name="name" type="number" fullWidth />
          <div className="sr-combo-inputs-row">
            <CardElement className="sr-input sr-card-element" options={options} />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDialog;
