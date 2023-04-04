import { useCallback, useState } from 'react';

import { ContentType } from '../types';
import { trackSignUpModalOpen } from 'modules/analytics/mixpanel/trackSignUpModalOpen';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';

const { DEFAULT, SIGN_UP, TOP_UP, CONTACT_SALES_FORM, CONTACT_SALES_SUCCESS } =
  ContentType;

interface UseContentTypeProps {
  defaultState?: ContentType;
}

export const useContentType = ({ defaultState }: UseContentTypeProps) => {
  const [contentType, setContentType] = useState(defaultState || DEFAULT);

  const setDefault = useCallback(
    () => setContentType(defaultState || DEFAULT),
    [defaultState],
  );
  const setSignUp = useCallback(() => {
    setContentType(SIGN_UP);

    trackSignUpModalOpen();
  }, []);
  const setTopUp = useCallback(() => setContentType(TOP_UP), []);
  const setContactSales = useCallback(
    () => setContentType(CONTACT_SALES_FORM),
    [],
  );
  const setContactSalesSuccess = useCallback(
    () => setContentType(CONTACT_SALES_SUCCESS),
    [],
  );

  useOnUnmount(setDefault);

  return {
    contentType,
    setDefault,
    setSignUp,
    setTopUp,
    setContactSales,
    setContactSalesSuccess,
  };
};
