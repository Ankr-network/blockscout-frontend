import { useCallback, useState } from 'react';

import { trackSignUpModalOpen } from 'modules/analytics/mixpanel/trackSignUpModalOpen';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';

import { ContentType } from '../types';

const { SIGN_UP, TOP_UP } = ContentType;

interface UseContentTypeProps {
  defaultState: ContentType;
}

export const useContentType = ({ defaultState }: UseContentTypeProps) => {
  const [contentType, setContentType] = useState(defaultState);

  const setDefault = useCallback(
    () => setContentType(defaultState),
    [defaultState],
  );
  const setSignUp = useCallback(() => {
    setContentType(SIGN_UP);

    trackSignUpModalOpen();
  }, []);
  const setTopUp = useCallback(() => setContentType(TOP_UP), []);

  useOnUnmount(setDefault);

  return {
    contentType,
    setDefault,
    setSignUp,
    setTopUp,
  };
};
