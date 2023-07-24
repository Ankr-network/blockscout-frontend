import { useEffect } from 'react';
import { Themes } from '@ankr.com/ui';

import { useThemeSwitcher } from 'modules/layout/hooks/useThemeSwitcher';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { useAuth } from '../domains/auth/hooks/useAuth';

export const useWeb3ThemeSwitcher = () => {
  const { hasWeb3Connection } = useAuth();
  const { handleThemeSwitcher, handleIsSwitchedReset } = useThemeSwitcher();

  const { isLightTheme, themes, isSwitched } = useThemes();

  useEffect(() => {
    const isNewWeb3Login = hasWeb3Connection && !isSwitched;

    if (isNewWeb3Login) {
      handleThemeSwitcher(Themes.dark);
    }

    const isWeb3Logout = !hasWeb3Connection && isSwitched;

    if (isWeb3Logout) {
      handleThemeSwitcher(Themes.light);
      handleIsSwitchedReset();
    }
  }, [
    hasWeb3Connection,
    handleThemeSwitcher,
    themes,
    isLightTheme,
    isSwitched,
    handleIsSwitchedReset,
  ]);
};
