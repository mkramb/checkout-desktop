import * as React from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';

interface PaymentLinkCreateProps {
  onCreate: (data: PaymentLinkCreateFields) => void;
}

interface PaymentLinkCreateFields {
  amount: number;
  currency: string;
  billing: {
    address: {
      country: string;
    };
  };
}

const PaymentLinkCreate: React.FunctionComponent<PaymentLinkCreateProps> = ({ onCreate }) => {
  const { register, handleSubmit, formState, reset } = useForm<PaymentLinkCreateFields>({
    mode: 'all',
    criteriaMode: 'all',
  });

  React.useEffect(() => {
    reset();
  }, [formState.isSubmitted]);

  return (
    <form onSubmit={handleSubmit(onCreate)}>
      <FormControl>
        <FormLabel htmlFor="amount">Amount</FormLabel>
        <Input
          id="amount"
          autoFocus
          {...register('amount', { required: true, valueAsNumber: true })}
        />
      </FormControl>
      <Box mt={2}>
        <FormControl>
          <FormLabel htmlFor="currency">Currency</FormLabel>
          <Input
            id="currency"
            placeholder="GBP"
            {...register('currency', {
              required: true,
              maxLength: 3,
            })}
          />
        </FormControl>
      </Box>
      <Box mt={2}>
        <FormControl>
          <FormLabel htmlFor="billing.address.country">Country</FormLabel>
          <Input
            id="billing.address.country"
            placeholder="GB"
            {...register('billing.address.country', {
              required: true,
              maxLength: 2,
            })}
          />
        </FormControl>
      </Box>
      <Box mt={6}>
        <Button width="full" colorScheme="teal" type="submit" disabled={!formState.isValid}>
          Create
        </Button>
      </Box>
    </form>
  );
};

export { PaymentLinkCreate, PaymentLinkCreateProps, PaymentLinkCreateFields };
