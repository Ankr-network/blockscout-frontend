import {
  ISignupDialogProps,
  SignupDialog,
} from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';

import {
  IIneligibleAccountDialogProps,
  IneligibleAccountDialog,
} from '../IneligibleAccountDialog';
import { ISuccessDialogProps, SuccessDialog } from '../SuccessDialog';
import { IWelcomeDialogProps, WelcomeDialog } from '../WelcomeDialog';

export interface IReferralFlowProps {
  ineligibleAccountDialogProps: IIneligibleAccountDialogProps;
  signInDialogProps: ISignupDialogProps;
  successDialogProps: ISuccessDialogProps;
  welcomeDialogProps: IWelcomeDialogProps;
}

export const ReferralFlow = ({
  ineligibleAccountDialogProps,
  signInDialogProps,
  successDialogProps,
  welcomeDialogProps,
}: IReferralFlowProps) => {
  return (
    <>
      <WelcomeDialog {...welcomeDialogProps} />
      <SignupDialog {...signInDialogProps} />
      <SuccessDialog {...successDialogProps} />
      <IneligibleAccountDialog {...ineligibleAccountDialogProps} />
    </>
  );
};
