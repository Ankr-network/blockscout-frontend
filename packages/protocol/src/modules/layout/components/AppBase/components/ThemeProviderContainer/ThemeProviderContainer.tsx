import { ReactNode, useMemo } from 'react';
import { ThemeProvider } from '@mui/material';

import { getMainTheme } from 'uiKit/Theme/mainTheme';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

export interface IThemeProviderContainerProps {
  children: ReactNode;
}

export const ThemeProviderContainer = ({
  children,
}: IThemeProviderContainerProps) => {
  const { themes } = useThemes();
  const currentTheme = useMemo(() => getMainTheme(themes), [themes]);

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};
