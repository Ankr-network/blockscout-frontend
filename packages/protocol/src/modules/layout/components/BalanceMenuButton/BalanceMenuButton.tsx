import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';

import { BalanceButton } from '../BalanceButton';
import { BalanceMenu } from '../BalanceMenu';
import { useBalanceMenuButton } from './useBalanceMenuButton';

export const BalanceMenuButton = () => {
  const {
    anchorEl,
    balance,
    balanceInRequests,
    creditBalance,
    currentChargingModel,
    handleClose,
    handleOpen,
    hasStatusTransition,
    isApiCreditsBalance,
    isBalanceMenuOpened,
    isLoading,
    isLoggedIn,
    usdBalance,
  } = useBalanceMenuButton();

  return (
    <GuardUserGroup blockName={BlockWithPermission.Billing}>
      <BalanceButton
        balance={balance}
        isApiCreditsBalance={isApiCreditsBalance}
        isLoading={isLoading}
        isLoggedIn={isLoggedIn}
        isMenuOpen={isBalanceMenuOpened}
        hasStatusTransition={hasStatusTransition}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
      <BalanceMenu
        currentChargingModel={currentChargingModel}
        balance={balance}
        creditBalance={creditBalance}
        usdBalance={usdBalance}
        balanceInRequests={balanceInRequests}
        isApiCreditsBalance={isApiCreditsBalance}
        anchorEl={anchorEl}
        open={isBalanceMenuOpened}
        onClose={handleClose}
      />
    </GuardUserGroup>
  );
};
