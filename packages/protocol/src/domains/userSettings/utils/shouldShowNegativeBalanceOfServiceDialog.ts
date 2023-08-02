interface ShouldShowNegativeBalanceOfServiceDialogArguments {
  isLoggedIn: boolean;
  authLoading: boolean;
  isLoading: boolean;
  shouldShowUserGroupDialog: boolean;
  tosAccepted: boolean;
  isDevRole: boolean;
  hasPremium: boolean;
  isFinanceRole: boolean;
}

export const shouldShowNegativeBalanceOfServiceDialog = ({
  isLoggedIn,
  authLoading,
  isLoading,
  shouldShowUserGroupDialog,
  tosAccepted,
  isDevRole,
  hasPremium,
  isFinanceRole,
}: ShouldShowNegativeBalanceOfServiceDialogArguments) => {
  if (!isLoggedIn) return false;

  if (authLoading || isLoading) return false;

  if (shouldShowUserGroupDialog) return false;

  if (tosAccepted) return false;

  if (isDevRole) return false;

  if (hasPremium || isFinanceRole) return true;

  return false;
};
