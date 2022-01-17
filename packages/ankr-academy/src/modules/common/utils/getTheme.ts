import { defaultTheme, FONTS, mainTheme, Themes } from 'ui';
import {
  alpha,
  unstable_createMuiStrictModeTheme as createTheme,
} from '@material-ui/core';

export const getTheme = (type: Themes) => {
  switch (type) {
    default:
      return createTheme({
        ...mainTheme,
        overrides: {
          ...mainTheme.overrides,
          MuiTypography: {
            ...mainTheme.overrides?.MuiTypography,
            h1: {
              fontFamily: FONTS.secondary,
              fontWeight: 'bold',
              fontSize: 66,
            },

            h2: {
              fontFamily: FONTS.secondary,
              fontWeight: 'bold',
              fontSize: 55,
            },

            h3: {
              fontFamily: FONTS.secondary,
              fontWeight: 'bold',
              fontSize: 45,
            },

            h4: {
              fontWeight: 'bold',
              fontSize: 34,
            },
          },
          MuiButton: {
            ...mainTheme.overrides?.MuiButton,
            containedSecondary: {
              ...mainTheme.overrides?.MuiButton?.containedSecondary,
              backgroundColor: defaultTheme.palette.common.black,

              '&:hover': {
                backgroundColor: alpha(defaultTheme.palette.common.black, 0.8),
              },
            },
          },
          MuiIconButton: {},
          MuiPaper: {
            ...mainTheme.overrides?.MuiPaper,
            rounded: {
              borderRadius: 28,
              padding: mainTheme.spacing(2.5),
              [mainTheme.breakpoints.up('md')]: {
                padding: mainTheme.spacing(3.5),
              },
            },
          },
        },
      });
  }
};
