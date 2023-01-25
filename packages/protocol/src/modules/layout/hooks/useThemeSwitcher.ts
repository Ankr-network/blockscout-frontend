import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Themes } from '@ankr.com/ui';

import { setIsSwitched, setTheme } from '../store/themeSlice';

export const useThemeSwitcher = () => {
  const dispatch = useDispatch();

  const handleThemeSwitcher = useCallback(
    (theme: Themes) => dispatch(setTheme(theme)),
    [dispatch],
  );

  const handleIsSwitchedReset = useCallback(() => {
    dispatch(setIsSwitched(false));
  }, [dispatch]);

  return { handleThemeSwitcher, handleIsSwitchedReset };
};
