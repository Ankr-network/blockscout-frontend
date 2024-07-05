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
import {
  ISwitchAccountDialogProps,
  SwitchAccountDialog,
} from '../SwitchAccountDialog';

export interface IReferralFlowProps {
  ineligibleAccountDialogProps: IIneligibleAccountDialogProps;
  signInDialogProps: ISignupDialogProps;
  successDialogProps: ISuccessDialogProps;
  switchAccountDialogProps: ISwitchAccountDialogProps;
  welcomeDialogProps: IWelcomeDialogProps;
}

export const ReferralFlow = ({
  ineligibleAccountDialogProps,
  signInDialogProps,
  successDialogProps,
  switchAccountDialogProps,
  welcomeDialogProps,
}: IReferralFlowProps) => {
  return (
    <>
      <WelcomeDialog {...welcomeDialogProps} />
      <SignupDialog {...signInDialogProps} />
      <SuccessDialog {...successDialogProps} />
      <IneligibleAccountDialog {...ineligibleAccountDialogProps} />
      <SwitchAccountDialog {...switchAccountDialogProps} />
    </>
  );
};
