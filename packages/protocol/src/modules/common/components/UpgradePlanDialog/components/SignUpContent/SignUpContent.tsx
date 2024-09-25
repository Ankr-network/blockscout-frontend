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
    isLoading,
    oauthLoginType,
    onDialogCloseClick,
    onGithubButtonClick,
    onGoogleButtonClick,
    setWeb3State,
  } = useSignupDialog({ hasOauthLogin, onClose, onOauthSignUp });

  return (
    <>
      <SignupDialogContent
        canProcessReferralCode
        currentState={currentState}
        isLoading={isLoading}
        oauthLoginType={oauthLoginType}
        onDialogClose={onDialogCloseClick}
        onGithubButtonClick={onGithubButtonClick}
        onGoogleButtonClick={onGoogleButtonClick}
        setWeb3State={setWeb3State}
      />
    </>
  );
};
