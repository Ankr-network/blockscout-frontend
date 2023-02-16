import { useCallback, useState } from 'react';

import { ContentType } from '../types';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';

const { DEFAULT, SIGN_UP, TOP_UP } = ContentType;

export const useContentType = () => {
  const [contentType, setContentType] = useState(DEFAULT);

  const setDefault = useCallback(() => setContentType(DEFAULT), []);
  const setSignUp = useCallback(() => setContentType(SIGN_UP), []);
  const setTopUp = useCallback(() => setContentType(TOP_UP), []);

  useOnUnmount(setDefault);

  return { contentType, setDefault, setSignUp, setTopUp };
};
