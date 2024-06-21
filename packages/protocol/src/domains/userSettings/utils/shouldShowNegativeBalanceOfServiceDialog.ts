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
  authLoading,
  hasGroupAccess,
  hasPremium,
  isEnterpriseClient,
  isEnterpriseStatusLoading,
  isErrorTosAcceptStatus,
  isFetchingTosAcceptStatus,
  isLoadingGroups,
  isLoadingJwtTokens,
  isLoadingTosAcceptStatus,
  isLoggedIn,
  isUninitializedTosAcceptStatus,
  shouldShowUserGroupDialog,
  tosAccepted,
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
