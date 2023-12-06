import { Dialog, DialogProps } from '@mui/material';

import { SignInForm } from 'modules/signIn/components/SignInForm';

export const SignInDialog = (props: DialogProps) => {
  return (
    <Dialog {...props}>
      <SignInForm />
    </Dialog>
  );
};
