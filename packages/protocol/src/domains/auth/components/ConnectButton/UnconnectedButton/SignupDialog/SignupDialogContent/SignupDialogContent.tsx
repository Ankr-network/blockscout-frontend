import { Button, Typography } from '@mui/material';
import { Google as GoogleIcon } from '@ankr.com/ui';
import { t, tHTML } from '@ankr.com/common';
import { ReactComponent as EthereumIcon } from 'uiKit/Icons/eth.svg';
import { ConnectWalletsContent } from '../ConnectWalletsContent';
import { EmailContent } from '../EmailContent';
import { useSignupDialogStyles } from '../useSignupDialogStyles';

export enum SignupDialogState {
  MAIN = 'MAIN',
  WEB3 = 'WEB3',
  WEB2 = 'WEB2',
}

interface SignupDialogProps {
  currentState: SignupDialogState;
  handleFetchLoginParams: () => void;
  onDialogClose: () => void;
  setWeb3State: () => void;
  onSuccess?: () => void;
}

export const SignupDialogContent = ({
  currentState,
  handleFetchLoginParams,
  onDialogClose,
  onSuccess,
  setWeb3State,
}: SignupDialogProps) => {
  const { classes } = useSignupDialogStyles();

  switch (currentState) {
    default:
    case SignupDialogState.MAIN:
      return (
        <>
          <Button
            fullWidth
            className={classes.button}
            variant="outlined"
            onClick={handleFetchLoginParams}
            startIcon={<GoogleIcon />}
          >
            {t('signup-modal.web2.button')}
          </Button>
          <Button
            fullWidth
            className={classes.button}
            variant="outlined"
            onClick={setWeb3State}
            startIcon={<EthereumIcon />}
          >
            {t('signup-modal.web3.button')}
          </Button>
          <Typography
            className={classes.subtitle}
            variant="body2"
            color="textSecondary"
          >
            {tHTML('signup-modal.description')}
          </Typography>
        </>
      );
    case SignupDialogState.WEB3:
      return (
        <ConnectWalletsContent onClose={onDialogClose} onSuccess={onSuccess} />
      );
    case SignupDialogState.WEB2:
      return <EmailContent onClick={handleFetchLoginParams} />;
  }
};
