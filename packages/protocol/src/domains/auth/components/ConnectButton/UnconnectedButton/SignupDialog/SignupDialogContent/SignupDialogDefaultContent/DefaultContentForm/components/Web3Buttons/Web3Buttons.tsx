import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import { ReactComponent as EthereumIcon } from 'uiKit/Icons/eth.svg';

import { useWeb3ButtonsStyles } from './useWeb3ButtonsStyles';

export interface IWeb3ButtonsProps {
  hasError?: boolean;
  onEthButtonClick: () => void;
}

export const Web3Buttons = ({
  hasError,
  onEthButtonClick,
}: IWeb3ButtonsProps) => {
  const { classes } = useWeb3ButtonsStyles();

  return (
    <Button
      className={classes.button}
      disabled={hasError}
      fullWidth
      onClick={onEthButtonClick}
      startIcon={<EthereumIcon />}
      type="submit"
      variant="outlined"
    >
      {t('signup-modal.web3.button')}
    </Button>
  );
};
