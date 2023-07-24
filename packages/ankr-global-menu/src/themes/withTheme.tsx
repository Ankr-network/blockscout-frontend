import {
  createGenerateClassName,
  MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core';
import { ComponentType } from 'react';
import { getMainTheme } from './mainTheme';
import { PROJECT_NAME } from '../common';
import { Themes } from '@ankr.com/ui';

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
    const component = (
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={getMainTheme(props.themes ?? Themes.light)}>
          <Child {...props} />
        </MuiThemeProvider>
      </StylesProvider>
    );

    return component;
  };
};
