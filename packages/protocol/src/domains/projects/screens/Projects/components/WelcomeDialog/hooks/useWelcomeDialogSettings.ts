import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectProjectsSettings,
  setProjectsSettings,
} from 'domains/projects/store';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useWelcomeDialogSettings = () => {
  const dispatch = useDispatch();
  const { address } = useAuth();
  const projectSettings = useSelector(selectProjectsSettings);
  const wasWelcomeDialogShown = projectSettings[address];

  const setSettings = useCallback(() => {
    dispatch(setProjectsSettings({ address, wasWelcomeDialogShown: true }));
  }, [dispatch, address]);

  return {
    wasWelcomeDialogShown,
    setSettings,
  };
};
