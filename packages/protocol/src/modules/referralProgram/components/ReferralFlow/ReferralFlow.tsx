import {
  ISignupDialogProps,
  SignupDialog,
} from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';

import { IWelcomeDialogProps, WelcomeDialog } from '../WelcomeDialog';
import { ISuccessDialogProps, SuccessDialog } from '../SuccessDialog';

export interface IReferralFlowProps {
  signInDialogProps: ISignupDialogProps;
  successDialogProps: ISuccessDialogProps;
  welcomeDialogProps: IWelcomeDialogProps;
}

export const ReferralFlow = ({
  signInDialogProps,
  successDialogProps,
  welcomeDialogProps,
}: IReferralFlowProps) => {
  return (
    <>
      <WelcomeDialog {...welcomeDialogProps} />
      <SignupDialog {...signInDialogProps} />
      <SuccessDialog {...successDialogProps} />
    </>
  );
};
