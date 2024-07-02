import {
  ISignupDialogProps,
  SignupDialog,
} from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';

import { IWelcomeDialogB2BProps, WelcomeDialogB2B } from '../WelComeDialogB2B';

export interface IReferralFlowB2BProps {
  signInDialogProps: ISignupDialogProps;
  welcomeDialogB2BProps: IWelcomeDialogB2BProps;
}

export const ReferralFlowB2B = ({
  signInDialogProps,
  welcomeDialogB2BProps,
}: IReferralFlowB2BProps) => {
  return (
    <>
      <WelcomeDialogB2B {...welcomeDialogB2BProps} />
      <SignupDialog {...signInDialogProps} />
    </>
  );
};
