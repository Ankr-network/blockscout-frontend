import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ReactNode } from 'react';
import '../../../../assets/fonts/style.css';
import { mainTheme } from '../../../themes/mainTheme';

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
