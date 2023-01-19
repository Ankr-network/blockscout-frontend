import { mainTheme as baseTheme } from '@ankr.com/ui';
import { createTheme } from '@mui/material/styles';
import { BREAKPOINTS } from './const';
import { TypographyTheme, getTypographTheme } from './themeUtils';

export const mainTheme = createTheme({
  ...baseTheme,
  breakpoints: BREAKPOINTS,
  components: {
    ...baseTheme.components,
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
            maxWidth: 1568,
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
  },
});
