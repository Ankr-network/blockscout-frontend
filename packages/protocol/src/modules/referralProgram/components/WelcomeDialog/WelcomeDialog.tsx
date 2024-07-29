import { Buttons } from './components/Buttons';
import { Greeting } from './components/Greeting';
import {
  IReferralFlowDialogProps,
  ReferralFlowDialog,
} from '../ReferralFlowDialog';

export interface IWelcomeDialogProps extends IReferralFlowDialogProps {
  blockchainName: string | undefined;
  hasActivateButton?: boolean;
  isActivating?: boolean;
  onActivateButtonClick: () => Promise<void>;
  onSignInButtonClick: () => void;
}

export const WelcomeDialog = ({
  blockchainName,
  hasActivateButton,
  isActivating,
  onActivateButtonClick,
  onSignInButtonClick,
  ...dialogProps
}: IWelcomeDialogProps) => {
  const { onClose } = dialogProps;

  return (
    <ReferralFlowDialog {...dialogProps}>
      <Greeting blockchainName={blockchainName} />
      <Buttons
        blockchainName={blockchainName}
        hasActivateButton={hasActivateButton}
        isActivating={isActivating}
        onActivateButtonClick={onActivateButtonClick}
        onCancelButtonClick={onClose}
        onSignInButtonClick={onSignInButtonClick}
      />
    </ReferralFlowDialog>
  );
};
