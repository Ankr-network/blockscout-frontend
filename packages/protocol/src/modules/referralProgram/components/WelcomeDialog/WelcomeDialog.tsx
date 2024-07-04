import { blockchainNamesMap } from 'modules/referralProgram/const';

import { Buttons } from './components/Buttons';
import { Greeting } from './components/Greeting';
import {
  IReferralFlowDialogProps,
  ReferralFlowDialog,
} from '../ReferralFlowDialog';

export interface IWelcomeDialogProps extends IReferralFlowDialogProps {
  hasActivateButton?: boolean;
  isActivating?: boolean;
  onActivateButtonClick: () => Promise<void>;
  onSignInButtonClick: () => void;
}

export const WelcomeDialog = ({
  hasActivateButton,
  isActivating,
  onActivateButtonClick,
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
        hasActivateButton={hasActivateButton}
        isActivating={isActivating}
        onActivateButtonClick={onActivateButtonClick}
        onCancelButtonClick={onClose}
        onSignInButtonClick={onSignInButtonClick}
      />
    </ReferralFlowDialog>
  );
};
