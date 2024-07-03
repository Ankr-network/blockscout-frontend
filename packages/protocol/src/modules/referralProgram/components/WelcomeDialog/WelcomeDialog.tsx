import { blockchainNamesMap } from 'modules/referralProgram/const';

import { Buttons } from './components/Buttons';
import { Greeting } from './components/Greeting';
import {
  IReferralFlowDialogProps,
  ReferralFlowDialog,
} from '../ReferralFlowDialog';

export interface IWelcomeDialogProps extends IReferralFlowDialogProps {
  onSignInButtonClick: () => void;
}

export const WelcomeDialog = ({
  onSignInButtonClick,
  ...dialogProps
}: IWelcomeDialogProps) => {
  const { onClose, referralCode } = dialogProps;

  const blockchainName = referralCode
    ? blockchainNamesMap[referralCode]
    : undefined;

  return (
    <ReferralFlowDialog {...dialogProps}>
      <Greeting blockchainName={blockchainName} />
      <Buttons
        onCancelButtonClick={onClose}
        onSignInButtonClick={onSignInButtonClick}
      />
    </ReferralFlowDialog>
  );
};
