import { LoadingState } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog/LoadingState';
import { SignupDialogContent } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog/SignupDialogContent';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog/useSignupDialog';

export interface SignUpContentProps {
  onGoogleSignUp: () => void;
  onClose: () => void;
}

export const SignUpContent = ({
  onClose,
  onGoogleSignUp,
}: SignUpContentProps) => {
  const { hasOauthLogin } = useAuth();

  const {
    currentState,
    setWeb3State,
    onGoogleButtonClick,
    loading,
    onDialogClose,
  } = useSignupDialog({ hasOauthLogin, onClose, onGoogleSignUp });

  return (
    <>
      {loading ? (
        <LoadingState />
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
