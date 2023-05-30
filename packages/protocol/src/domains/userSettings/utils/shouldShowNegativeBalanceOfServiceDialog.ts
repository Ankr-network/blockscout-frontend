export const shouldShowNegativeBalanceOfServiceDialog = (
  isLoggedIn: boolean,
  authLoading: boolean,
  isLoading: boolean,
  tosAccepted: boolean,
  isDevRole: boolean,
  hasPremium: boolean,
  isFinanceRole: boolean,
) => {
  if (!isLoggedIn) return false;

  if (authLoading || isLoading) return false;

  if (tosAccepted) return false;

  if (isDevRole) return false;

  if (hasPremium || isFinanceRole) return true;

  return false;
};
