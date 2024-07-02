import { blockchainNamesMap } from 'modules/referralProgram/const';

import { Buttons } from './components/Buttons';
import { Greeting } from './components/Greeting';
import {
  IReferralFlowDialogProps,
  ReferralFlowDialog,
} from '../ReferralFlowDialog';

export interface IWelcomeDialogProps extends IReferralFlowDialogProps {
  onCancelButtonClick: () => void;
  onSignInButtonClick: () => void;
}

export const WelcomeDialog = ({
  onCancelButtonClick,
  onSignInButtonClick,
  referralCode,
  ...dialogProps
}: IWelcomeDialogProps) => {
  const blockchainName = referralCode
    ? blockchainNamesMap[referralCode]
    : undefined;

  return (
    <ReferralFlowDialog referralCode={referralCode} {...dialogProps}>
      <Greeting blockchainName={blockchainName} />
      <Buttons
        onCancelButtonClick={onCancelButtonClick}
        onSignInButtonClick={onSignInButtonClick}
      />
    </ReferralFlowDialog>
  );
};
