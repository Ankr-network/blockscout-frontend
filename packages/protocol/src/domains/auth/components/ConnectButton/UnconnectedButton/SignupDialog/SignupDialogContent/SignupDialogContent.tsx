import { SignupDialogWeb3Content } from './SignupDialogWeb3Content';
import { SignupDialogWeb2Content } from './SignupDialogWeb2Content';
import {
  SignupDialogDefaultContent,
  SignupDialogState,
} from './SignupDialogDefaultContent';

interface SignupDialogProps {
  currentState: SignupDialogState;
  onDialogClose: () => void;
  onGoogleButtonClick: () => void;
  onSuccess?: () => void;
  setWeb3State: () => void;
}

export const SignupDialogContent = ({
  currentState,
  onDialogClose,
  onGoogleButtonClick,
  onSuccess,
  setWeb3State,
}: SignupDialogProps) => {
  switch (currentState) {
    case SignupDialogState.WEB3:
      return (
        <SignupDialogWeb3Content
          onClose={onDialogClose}
          onSuccess={onSuccess}
        />
      );

    case SignupDialogState.WEB2:
      return <SignupDialogWeb2Content onClick={onGoogleButtonClick} />;

    case SignupDialogState.DEFAULT:
    default:
      return (
        <SignupDialogDefaultContent
          onGoogleButtonClick={onGoogleButtonClick}
          setWeb3State={setWeb3State}
        />
      );
  }
};
