import { Form, FormProps } from 'react-final-form';

import { AmountFormValues } from '../../types';

export const AmountForm = (props: FormProps<AmountFormValues>) => {
  return <Form<AmountFormValues> {...props} />;
};
