import { EmailContentLoading } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog/EmailContentLoading';
import { SignupDialogContent } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog/SignupDialogContent';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog/useSignupDialog';

export interface SignUpContentProps {
  onGoogleSignUp: () => void;
}

export const SignUpContent = ({ onGoogleSignUp }: SignUpContentProps) => {
  const { hasOauthLogin } = useAuth();

  const {
    currentState,
    setWeb3State,
    onGoogleButtonClick,
    loading,
    onDialogClose,
  } = useSignupDialog({
    hasOauthLogin,
    onGoogleSignUp,
    onManualClose: () => {},
  });

  return (
    <>
      {loading ? (
        <EmailContentLoading />
      ) : (
        <SignupDialogContent
          currentState={currentState}
          onDialogClose={onDialogClose}
          onGoogleButtonClick={onGoogleButtonClick}
          setWeb3State={setWeb3State}
        />
      )}
    </>
  );
};
