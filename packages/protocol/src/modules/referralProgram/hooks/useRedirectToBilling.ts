import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { AccountRoutesConfig } from 'domains/account/Routes';

const billingPageUrl = AccountRoutesConfig.accountDetails.generatePath();

export const useRedirectToBilling = () => {
  const history = useHistory();
  const push = history?.push;

  const redirectToBilling = useCallback(() => push?.(billingPageUrl), [push]);

  return { redirectToBilling };
};
