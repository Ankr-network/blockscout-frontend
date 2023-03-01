import React, { ReactNode, useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Spinner } from 'ui';
import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { getTheme } from 'modules/common/utils/getTheme';
import { useInitialaizeLocale } from './AppBaseUtils';
import { CssModulesPriority } from './CssModulesPriority';

interface IAppBase {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBase): JSX.Element => {
  const isInitialized = useInitialaizeLocale();
  const theme = useMemo(() => getTheme(), []);

  return (
    <CssModulesPriority>
      <ThemeProvider theme={theme}>
        {!isReactSnap() && <CssBaseline />}
        {isInitialized ? <>{children}</> : <Spinner />}
      </ThemeProvider>
    </CssModulesPriority>
  );
};
