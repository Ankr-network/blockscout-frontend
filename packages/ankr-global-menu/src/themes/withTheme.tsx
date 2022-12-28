import {
  createGenerateClassName,
  MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core';
import { ComponentType } from 'react';
import { mainTheme } from './mainTheme';
import { PROJECT_NAME } from '../common';

const generateClassName = createGenerateClassName({
  productionPrefix:
    typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap'
      ? `${PROJECT_NAME}-snap`
      : `${PROJECT_NAME}-jss`,
  seed: PROJECT_NAME,
});

export const withTheme = <T extends Record<string, any>>(
  Child: ComponentType<T>,
) => {
  return (props: T) => {
    return (
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={mainTheme}>
          <Child {...props} />
        </MuiThemeProvider>
      </StylesProvider>
    );
  };
};
