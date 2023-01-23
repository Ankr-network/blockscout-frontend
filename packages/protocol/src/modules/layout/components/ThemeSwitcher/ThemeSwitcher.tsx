import React, { useCallback } from 'react';

import { IconButton } from '@mui/material';
import { Moon, Sun, Themes } from '@ankr.com/ui';
import { useThemeSwitcher } from 'modules/layout/hooks/useThemeSwitcher';
import { useThemeSwitcherStyles } from './useThemeSwitcherStyles';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

export const ThemeSwitcher = () => {
  const { classes } = useThemeSwitcherStyles();

  const { isLightTheme } = useThemes();

  const handleThemeSwitcher = useThemeSwitcher();

  const handleClick = useCallback(() => {
    handleThemeSwitcher(isLightTheme ? Themes.dark : Themes.light);
  }, [isLightTheme, handleThemeSwitcher]);

  return (
    <IconButton className={classes.root} onClick={handleClick}>
      {isLightTheme ? <Moon /> : <Sun />}
    </IconButton>
  );
};
