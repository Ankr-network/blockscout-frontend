import { CircularProgress, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { ArrowDown } from '@ankr.com/ui';

import { LoadableButton } from 'uiKit/LoadableButton';

import { useBalanceButtonStyles } from './useBalanceButtonStyles';
import { PlusLink } from './components/PlusLink';

export interface IBalanceButtonProps {
  isMenuOpen: boolean;
  balance: number;
  hasStatusTransition: boolean;
  isApiCreditsBalance: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  handleClose: () => void;
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const valueBalanceKey = 'header.balance-button.value';
const creditBalanceKey = 'header.balance-button.credits';
const requestBalanceKey = 'header.balance-button.requests';

export const BalanceButton = ({
  balance,
  handleClose,
  handleOpen,
  hasStatusTransition,
  isApiCreditsBalance,
  isLoading,
  isLoggedIn,
  isMenuOpen,
}: IBalanceButtonProps) => {
  const { classes } = useBalanceButtonStyles({
    isMenuOpen,
  });

  const hasEndIcon = !isLoading && hasStatusTransition;

  if (!isLoggedIn) return null;

  const balanceKey = isApiCreditsBalance ? creditBalanceKey : requestBalanceKey;

  return (
    <LoadableButton
      className={classes.buttonRoot}
      loading={isLoading}
      variant="text"
      onClick={isMenuOpen ? handleClose : handleOpen}
      endIcon={hasEndIcon && <CircularProgress size={20} />}
    >
      <div className={classes.content}>
        <Typography variant="button3" className={classes.balance}>
          <span className={classes.balanceValue}>
            {t(valueBalanceKey, {
              balance,
            })}
          </span>

          {t(balanceKey)}
        </Typography>

        <ArrowDown className={classes.selectIcon} />

        <PlusLink />
      </div>
    </LoadableButton>
  );
};
