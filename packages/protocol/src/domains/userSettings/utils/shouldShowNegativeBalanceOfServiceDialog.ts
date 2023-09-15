interface ShouldShowNegativeBalanceOfServiceDialogArguments {
  isLoggedIn: boolean;
  authLoading: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isUninitialized: boolean;
  shouldShowUserGroupDialog: boolean;
  tosAccepted: boolean;
  isDevRole: boolean;
  hasPremium: boolean;
  isFinanceRole: boolean;
  isError: boolean;
  isEnterpriseClient: boolean;
  isLoadingEnterpriseStatus: boolean;
}

export const shouldShowNegativeBalanceOfServiceDialog = ({
  isLoggedIn,
  authLoading,
  isLoading,
  isFetching,
  isUninitialized,
  shouldShowUserGroupDialog,
  tosAccepted,
  isDevRole,
  hasPremium,
  isFinanceRole,
  isError,
  isEnterpriseClient,
  isLoadingEnterpriseStatus,
}: ShouldShowNegativeBalanceOfServiceDialogArguments) => {
  if (!isLoggedIn) return false;

  if (
    authLoading ||
    isLoading ||
    isUninitialized ||
    isFetching ||
    isLoadingEnterpriseStatus
  )
    return false;

  if (isError) return false;

  if (shouldShowUserGroupDialog) return false;

  if (tosAccepted) return false;

  if (isDevRole) return false;

  if (isEnterpriseClient) return false;

  if (hasPremium || isFinanceRole) return true;

  return false;
};
