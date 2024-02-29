import { CircularProgress, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { ArrowDown } from '@ankr.com/ui';

import { LoadableButton } from 'uiKit/LoadableButton';

import { useBalanceButton } from './hooks/useBalanceButton';
import { useBalanceButtonStyles } from './useBalanceButtonStyles';
import { renderBalance } from './utils/formatBalance';
import { PlusLink } from './components/PlusLink';

export interface IBalanceButtonProps {
  isMobileType?: boolean;
}

const creditBalanceKey = 'header.balance-button.credits';
const requestBalanceKey = 'header.balance-button.requests';

export const BalanceButton = ({
  isMobileType = false,
}: IBalanceButtonProps) => {
  const {
    balance,
    hasStatusTransition,
    isApiCreditsBalance,
    isLoading,
    isLoggedIn,
  } = useBalanceButton();

  const { cx, classes } = useBalanceButtonStyles({
    isMenuOpen: false,
  });

  const hasEndIcon = !isLoading && hasStatusTransition;

  if (!isLoggedIn) return null;

  const balanceKey = isApiCreditsBalance ? creditBalanceKey : requestBalanceKey;

  return (
    <LoadableButton
      className={cx({
        [classes.buttonRoot]: !isMobileType,
        [classes.mobileTypeButtonRoot]: isMobileType,
      })}
      loading={isLoading}
      variant="text"
      endIcon={hasEndIcon && <CircularProgress size={20} />}
    >
      <div
        className={cx(classes.content, {
          [classes.mobileTypeContent]: isMobileType,
        })}
      >
        <Typography
          variant="button3"
          className={cx(classes.balance, {
            [classes.label]: !isMobileType,
            [classes.mobileTypeLabel]: isMobileType,
          })}
        >
          <span className={classes.balanceValue}>{renderBalance(balance)}</span>

          {t(balanceKey)}
        </Typography>

        <ArrowDown className={classes.selectIcon} />

        <PlusLink />
      </div>
    </LoadableButton>
  );
};
