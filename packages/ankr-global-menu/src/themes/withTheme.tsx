import { createGenerateClassName, MuiThemeProvider } from '@material-ui/core';
import { ComponentType } from 'react';
import { mainTheme } from './mainTheme';
import { RewiredStylesProvider } from 'ui';
import { PROJECT_NAME } from '../common';

const generateClassName = createGenerateClassName({
  productionPrefix: `${PROJECT_NAME}-jss`,
  seed: PROJECT_NAME,
});

export const withTheme = <T extends Record<string, any>>(
  Child: ComponentType<T>,
) => {
  return (props: T) => {
    return (
      <RewiredStylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={mainTheme}>
          <Child {...props} />
        </MuiThemeProvider>
      </RewiredStylesProvider>
    );
  };
};
