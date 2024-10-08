import { getMainTheme as getBaseTheme, Themes } from '@ankr.com/ui';
import { createTheme } from '@mui/material/styles';

import { getGlobalStyles } from 'uiKit/utils/getGlobalStyles';

import { BREAKPOINTS } from './const';
import { ReactComponent as IndeterminateCheckboxIcon } from './assets/indeterminateCheckboxIcon.svg';
import { TypographyTheme, getTypographyTheme } from './themeUtils';

export const getMainTheme = (themes: Themes) => {
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
          h1: getTypographyTheme(TypographyTheme?.h1),
          h2: getTypographyTheme(TypographyTheme?.h2),
          h3: getTypographyTheme(TypographyTheme?.h3),
          h4: getTypographyTheme(TypographyTheme?.h4),
          h5: getTypographyTheme(TypographyTheme?.h5),
          h6: getTypographyTheme(TypographyTheme?.h6),
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

            '&.Mui-disabled': {
              '--indeterminate-checkbox-background': baseTheme.palette.divider,
              '--indeterminate-checkbox-sign': baseTheme.palette.text.disabled,
            },
          },
        },
      },
    },
  });
};

export const mainTheme = getMainTheme(Themes.light);
