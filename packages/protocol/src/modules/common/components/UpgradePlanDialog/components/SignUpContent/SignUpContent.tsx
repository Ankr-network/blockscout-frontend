import { SignupDialogContent } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog/SignupDialogContent';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog/SignupDialogContent/hooks/useSignupDialog';

export interface SignUpContentProps {
  onOauthSignUp: () => void;
  onClose: () => void;
}

export const SignUpContent = ({
  onClose,
  onOauthSignUp,
}: SignUpContentProps) => {
  const { hasOauthLogin } = useAuth();

  const {
    currentState,
    setWeb3State,
    onGoogleButtonClick,
    onGithubButtonClick,
    isLoading,
    onDialogCloseClick,
    oauthLoginType,
  } = useSignupDialog({ hasOauthLogin, onClose, onOauthSignUp });

  return (
    <>
      <SignupDialogContent
        currentState={currentState}
        onDialogClose={onDialogCloseClick}
        onGoogleButtonClick={onGoogleButtonClick}
        onGithubButtonClick={onGithubButtonClick}
        setWeb3State={setWeb3State}
        isLoading={isLoading}
        oauthLoginType={oauthLoginType}
      />
    </>
  );
};
