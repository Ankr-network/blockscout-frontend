import { Button, Fade, Menu, MenuProps } from '@mui/material';
import { t } from '@ankr.com/common';
import { Link } from 'react-router-dom';
import { ArrowRightSmall } from '@ankr.com/ui';

import { AccountRoutesConfig } from 'domains/account/Routes';

import { useBalanceMenuStyles } from './useBalanceMenuStyles';
import {
  BalanceMenuContent,
  IBalanceMenuContentProps,
} from './BalanceMenuContent';

export type BalanceMenuProps = Pick<MenuProps, 'anchorEl' | 'open'> &
  IBalanceMenuContentProps & {
    onClose: () => void;
  };

const buttonKey = 'header.balance-menu.billing-page-button';

export const BalanceMenu = ({
  anchorEl,
  balanceInRequests,
  creditBalance,
  currentChargingModel,
  isApiCreditsBalance,
  onClose,
  open,
  usdBalance,
}: BalanceMenuProps) => {
  const { classes } = useBalanceMenuStyles();

  return (
    <Menu
      PaperProps={{
        className: classes.paper,
      }}
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: 40,
        horizontal: 'left',
      }}
      classes={{
        list: classes.list,
      }}
      disableScrollLock
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={onClose}
      open={open}
      anchorEl={anchorEl}
    >
      <div className={classes.root}>
        <BalanceMenuContent
          balanceInRequests={balanceInRequests}
          creditBalance={creditBalance}
          currentChargingModel={currentChargingModel}
          isApiCreditsBalance={isApiCreditsBalance}
          usdBalance={usdBalance}
        />

        <Button
          component={Link}
          className={classes.button}
          to={AccountRoutesConfig.accountDetails.generatePath()}
          variant="text"
          startIcon={<ArrowRightSmall />}
          size="small"
        >
          {t(buttonKey)}
        </Button>
      </div>
    </Menu>
  );
};
