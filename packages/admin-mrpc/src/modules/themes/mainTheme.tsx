import { getMainTheme as getBaseTheme, Themes } from '@ankr.com/ui';
import { createTheme, Theme } from '@mui/material/styles';

import { getGlobalStyles } from 'uiKit/utils/getGlobalStyles';

import { BREAKPOINTS } from './const';
import { ReactComponent as IndeterminateCheckboxIcon } from './assets/indeterminateCheckboxIcon.svg';
import { TypographyTheme, getTypographTheme } from './themeUtils';

export const getMainTheme = (themes: Themes): Theme => {
  const baseTheme = getBaseTheme(themes);

  return createTheme({
    ...baseTheme,
    breakpoints: BREAKPOINTS,
    components: {
      ...baseTheme.components,
      MuiCssBaseline: {
        styleOverrides: getGlobalStyles(baseTheme.palette),
      },
      MuiContainer: {
        ...baseTheme.components?.MuiContainer,
        styleOverrides: {
          ...baseTheme.components?.MuiContainer?.styleOverrides,
          root: {
            '@media (min-width: 576px)': {
              paddingLeft: 24,
              paddingRight: 24,
            },
            '@media (min-width: 1200px)': {
              paddingLeft: 60,
              paddingRight: 60,
            },
            '&&': {
              maxWidth: '100%',
            },
          },
        },
      },
      MuiTypography: {
        ...baseTheme.components?.MuiTypography,
        styleOverrides: {
          ...TypographyTheme,
          h1: getTypographTheme(TypographyTheme?.h1),
          h2: getTypographTheme(TypographyTheme?.h2),
          h3: getTypographTheme(TypographyTheme?.h3),
          h4: getTypographTheme(TypographyTheme?.h4),
          h5: getTypographTheme(TypographyTheme?.h5),
          h6: getTypographTheme(TypographyTheme?.h6),
        },
      },
      MuiCheckbox: {
        ...baseTheme.components?.MuiCheckbox,
        defaultProps: {
          ...baseTheme.components?.MuiCheckbox?.defaultProps,
          indeterminateIcon: <IndeterminateCheckboxIcon />,
        },
        styleOverrides: {
          ...baseTheme.components?.MuiCheckbox?.styleOverrides,
          indeterminate: {
            '--indeterminate-checkbox-background':
              baseTheme.palette.primary.main,
            '--indeterminate-checkbox-sign': baseTheme.palette.background.paper,

            '&:hover': {
              '--indeterminate-checkbox-background':
                baseTheme.palette.primary.dark,
            },
          },
        },
      },
      MuiButton: {
        ...baseTheme.components?.MuiButton,
        defaultProps: {
          ...baseTheme.components?.MuiButton?.defaultProps,
        },
        styleOverrides: {
          ...baseTheme.components?.MuiButton?.styleOverrides,
          root: {
            // @ts-ignore
            ...(baseTheme?.components?.MuiButton?.styleOverrides?.root || {}),
            whiteSpace: 'nowrap',
          },
        },
      },
    },
  });
};

export const mainTheme = getMainTheme(Themes.light);
