import { CircularProgress, Typography } from '@mui/material';
import { tHTML } from '@ankr.com/common';
import { ArrowDown } from '@ankr.com/ui';

import { LoadableButton } from 'uiKit/LoadableButton';

import { useBalanceButton } from './hooks/useBalanceButton';
import { useBalanceButtonStyles } from './useBalanceButtonStyles';
import { renderBalance } from './utils/formatBalance';
import { PlusLink } from './components/PlusLink';

export interface BalanceButtonProps {
  isMobileType?: boolean;
  isSidebarType?: boolean;
}

export const BalanceButton = ({
  isMobileType = false,
  isSidebarType = false,
}: BalanceButtonProps) => {
  const { balance, hasStatusTransition, isLoading, isUninitialized } =
    useBalanceButton();

  const { cx, classes } = useBalanceButtonStyles({
    isMenuOpen: false,
  });

  const hasEndIcon = !isLoading && hasStatusTransition;

  if (isUninitialized) return null;

  return (
    <LoadableButton
      className={cx({
        [classes.buttonRoot]: !isMobileType,
        [classes.mobileTypeButtonRoot]: isMobileType,
        [classes.sidebarTypeButtonRoot]: isSidebarType,
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
          {tHTML('header.balance-button.credits-value', {
            value: renderBalance(balance),
          })}
        </Typography>

        <ArrowDown className={classes.selectIcon} />

        <PlusLink />
      </div>
    </LoadableButton>
  );
};
