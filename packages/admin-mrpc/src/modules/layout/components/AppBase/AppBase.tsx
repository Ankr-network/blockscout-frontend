import React, { ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { OverlaySpinner as Spinner } from '@ankr.com/ui';

import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { mainTheme } from 'modules/themes/mainTheme';

import { useInitialaizeLocale } from './AppBaseUtils';
import { CssModulesPriority } from './CssModulesPriority';

interface IAppBase {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBase): JSX.Element => {
  const isInitialized = useInitialaizeLocale();

  return (
    <CssModulesPriority>
      <ThemeProvider theme={mainTheme}>
        {!isReactSnap() && <CssBaseline />}
        {isInitialized ? <>{children}</> : <Spinner />}
      </ThemeProvider>
    </CssModulesPriority>
  );
};
