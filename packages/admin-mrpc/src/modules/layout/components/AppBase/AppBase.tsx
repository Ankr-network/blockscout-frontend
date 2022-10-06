import React, { ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { mainTheme } from '@ankr.com/ui';
import { Spinner } from 'ui';
import { configureTheme } from 'modules/common/utils/configureTheme';
import { useInitialaizeLocale } from './AppBaseUtils';
import { CssModulesPriority } from './CssModulesPriority';

interface IAppBase {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBase): JSX.Element => {
  const isInitialized = useInitialaizeLocale();

  return (
    <CssModulesPriority>
      <ThemeProvider theme={configureTheme(mainTheme)}>
        <CssBaseline />
        {isInitialized ? <>{children}</> : <Spinner />}
      </ThemeProvider>
    </CssModulesPriority>
  );
};
