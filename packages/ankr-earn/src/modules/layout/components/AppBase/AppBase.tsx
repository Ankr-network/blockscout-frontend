import { ReactNode } from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { mainTheme } from '../../../../themes/mainTheme';
import '../../../../assets/fonts/style.css';

interface IAppBaseProps {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBaseProps) => {
  return (
    <MuiThemeProvider theme={mainTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
