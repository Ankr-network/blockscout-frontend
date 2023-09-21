interface ShouldShowNegativeBalanceOfServiceDialogArguments {
  isLoggedIn: boolean;
  authLoading: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isUninitialized: boolean;
  shouldShowUserGroupDialog: boolean;
  tosAccepted: boolean;
  hasPremium: boolean;
  hasGroupAccess: boolean;
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
  hasPremium,
  hasGroupAccess,
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

  if (isEnterpriseClient) return false;

  return hasPremium || hasGroupAccess;
};
