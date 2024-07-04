import { blockchainNamesMap } from 'modules/referralProgram/const';

import { Buttons } from './components/Buttons';
import { Greeting } from './components/Greeting';
import {
  IReferralFlowDialogProps,
  ReferralFlowDialog,
} from '../ReferralFlowDialog';

export interface IWelcomeDialogProps extends IReferralFlowDialogProps {
  hasJoinButton?: boolean;
  isJoining?: boolean;
  onJoinButtonClick: () => Promise<void>;
  onSignInButtonClick: () => void;
}

export const WelcomeDialog = ({
  hasJoinButton,
  isJoining,
  onJoinButtonClick,
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
        hasJoinButton={hasJoinButton}
        isJoining={isJoining}
        onCancelButtonClick={onClose}
        onJoinButtonClick={onJoinButtonClick}
        onSignInButtonClick={onSignInButtonClick}
      />
    </ReferralFlowDialog>
  );
};
