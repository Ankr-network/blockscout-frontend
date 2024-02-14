import { useCallback } from 'react';

import { HIDE_ACCESS_DENIED_DIALOG_FLAG } from '../constants/common';

export const useAvoidAccessDeniedAlert = () => {
  return useCallback(() => {
    localStorage.setItem(HIDE_ACCESS_DENIED_DIALOG_FLAG, 'true');
    setTimeout(
      () => localStorage.removeItem(HIDE_ACCESS_DENIED_DIALOG_FLAG),
      1_000,
    );
  }, []);
};
