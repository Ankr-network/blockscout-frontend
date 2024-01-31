interface ShouldShowNegativeBalanceOfServiceDialogArguments {
  isLoggedIn: boolean;
  authLoading: boolean;
  isLoadingTosAcceptStatus: boolean;
  isFetchingTosAcceptStatus: boolean;
  isUninitializedTosAcceptStatus: boolean;
  shouldShowUserGroupDialog: boolean;
  tosAccepted: boolean;
  hasPremium: boolean;
  hasGroupAccess: boolean;
  isErrorTosAcceptStatus: boolean;
  isEnterpriseClient: boolean;
  isEnterpriseStatusLoading: boolean;
  isLoadingGroups: boolean;
  isLoadingJwtTokens: boolean;
}

export const shouldShowNegativeBalanceOfServiceDialog = ({
  isLoggedIn,
  authLoading,
  isLoadingTosAcceptStatus,
  isFetchingTosAcceptStatus,
  isUninitializedTosAcceptStatus,
  shouldShowUserGroupDialog,
  tosAccepted,
  hasPremium,
  hasGroupAccess,
  isErrorTosAcceptStatus,
  isEnterpriseClient,
  isEnterpriseStatusLoading,
  isLoadingGroups,
  isLoadingJwtTokens,
}: ShouldShowNegativeBalanceOfServiceDialogArguments) => {
  if (!isLoggedIn) return false;

  if (
    authLoading ||
    isLoadingTosAcceptStatus ||
    isFetchingTosAcceptStatus ||
    isUninitializedTosAcceptStatus ||
    isEnterpriseStatusLoading ||
    isLoadingGroups ||
    isLoadingJwtTokens
  )
    return false;

  if (isErrorTosAcceptStatus) return false;

  if (shouldShowUserGroupDialog) return false;

  if (tosAccepted) return false;

  if (isEnterpriseClient) return false;

  if (!hasGroupAccess) return false;

  return hasPremium;
};
