import React from 'react';
import { createMuiTheme, fade, lighten, ThemeOptions } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { CheckboxCheckedIcon, CheckboxIcon } from 'uiKit/Checkbox';
import { BREAKPOINTS, BTN_TRANSITION_TIME } from './const';
import { Themes } from './types';
import { StepIcon } from './components/StepIcon';

const TEN_SECONDS = 10 * 1000;
const NOTIFICATION_AUTO_HIDE_DURATION = 3000;

export const FONTS = {
  primary: ['Gilroy', 'Arial', 'sans-serif'].join(','),
  secondary: ['"TT Firs Neue"', 'Arial', 'sans-serif'].join(','),
};

export const PALETTE: PaletteOptions = {
  type: Themes.light,
  common: {
    white: '#fff',
    black: '#000',
  },
  primary: {
    light: lighten('#356DF3', 0.1),
    main: '#356DF3',
    dark: '#2A5BD1',
  },
  background: {
    default: '#fff',
    paper: '#F2F5FA',
  },
  text: {
    primary: '#1F2226',
    secondary: fade('#1F2226', 0.5),
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#4DB58F',
    light: fade('#4DB58F', 0.15),
  },
  error: {
    main: '#E3453D',
    light: fade('#E3453D', 0.15),
  },
  grey: {
    500: '#808692',
  },
};

export const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
  breakpoints: BREAKPOINTS,
});

export const mainTheme = createMuiTheme({
  spacing: defaultTheme.spacing,
  palette: defaultTheme.palette,
  breakpoints: defaultTheme.breakpoints,

  typography: {
    fontFamily: FONTS.primary,
    color: PALETTE.text?.primary,
  },

  props: {
    MuiStep: {
      StepIconComponent: StepIcon,
    },
    MuiSnackbar: {
      autoHideDuration: NOTIFICATION_AUTO_HIDE_DURATION,
    },
    MuiAlert: {
      icon: false,
    },
    MuiContainer: {
      maxWidth: 'xl',
    },
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiButton: {
      variant: 'contained',
      disableElevation: true,
    },
    MuiPaper: {
      elevation: 0,
    },
    MuiTooltip: {
      enterTouchDelay: 0,
      leaveTouchDelay: TEN_SECONDS,
    },
    MuiTextField: {
      variant: 'outlined',
      InputLabelProps: {
        shrink: true,
        variant: 'standard',
      },
    },
    MuiSelect: {
      MenuProps: {
        elevation: 0,
        getContentAnchorEl: null,

        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },

        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },

        MenuListProps: {},
      },
    },

    MuiDialog: {
      fullWidth: true,
      maxWidth: 'md',
      PaperProps: {
        elevation: 0,
      },
    },
    MuiCheckbox: {
      color: 'primary',
      icon: <CheckboxIcon />,
      checkedIcon: <CheckboxCheckedIcon />,
    },
    MuiStepLabel: {
      StepIconComponent: StepIcon,
    },
  },

  overrides: {
    MuiCssBaseline: {
      '@global': {
        a: {
          color: 'inherit',
          fontSize: 'inherit',
          textDecoration: 'none',
          transition: 'color 0.2s',

          '&:hover': {
            color: 'inherit',
          },
        },
      },
    },

    MuiContainer: {
      root: {
        [defaultTheme.breakpoints.up('xl')]: {
          paddingLeft: defaultTheme.spacing(7.5),
          paddingRight: defaultTheme.spacing(7.5),
        },
      },

      maxWidthXl: {
        [defaultTheme.breakpoints.up('xl')]: {
          maxWidth: 1520 + 48,
        },
      },
    },

    MuiTypography: {
      root: {
        '& b': {
          fontWeight: 'bold',
        },
        '& a': {
          '&:hover': {
            color: PALETTE.text?.primary,
          },
        },
      },

      h1: {
        fontFamily: FONTS.primary,
        fontWeight: 'bold',
        fontSize: 70,
      },

      h2: {
        fontFamily: FONTS.primary,
        fontWeight: 'bold',
        fontSize: 60,
      },

      h3: {
        fontFamily: FONTS.primary,
        fontWeight: 'bold',
        fontSize: 30,
      },

      h4: {
        fontSize: 18,
        fontWeight: 'bold',
      },

      h5: {
        fontSize: 16,
        fontWeight: 'bold',
      },

      body1: {
        fontSize: 18,
        fontWeight: 500,
      },

      body2: {
        fontSize: 16,
        fontWeight: 500,
      },

      subtitle1: {
        fontSize: 14,
        fontWeight: 500,

        [defaultTheme.breakpoints.down('sm')]: {
          fontSize: 12,
        },
      },

      subtitle2: {
        fontSize: 12,
        fontWeight: 500,
      },
    },

    MuiInputBase: {
      root: {
        fontSize: 16,
        border: `1px solid ${fade(defaultTheme.palette.common.black, 0.1)}`,
        transition: 'border 0.2s',

        '&:hover, &.Mui-focused': {
          borderColor: fade(defaultTheme.palette.common.black, 0.3),
        },

        '& fieldset': {
          display: 'none',
        },
      },

      input: {
        '&[type=number]': {
          '-moz-appearance': 'textfield',
        },

        '&::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
        },

        '&::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
        },
      },
    },

    MuiInputLabel: {
      shrink: {
        position: 'static',
        marginBottom: 20,
        fontSize: 16,
        fontWeight: 700,
        color: '#000',
        transform: 'none',
      },
    },

    MuiOutlinedInput: {
      root: {
        borderRadius: 8,
      },

      input: {
        padding: defaultTheme.spacing(2.3, 2),
        minHeight: 58,
        boxSizing: 'border-box',
      },
    },

    MuiSelect: {
      select: {
        '&:focus, &:hover': {
          backgroundColor: defaultTheme.palette.background.default,
          borderRadius: 18,
          borderColor: 'transparent',
        },
      },
      outlined: {
        '&&': {
          fontSize: 12,
          padding: '10px 29px 9px 15px',
        },
      },

      iconOpen: {
        color: defaultTheme.palette.text.primary,
      },
      iconOutlined: {
        fontSize: 10,
        right: 16,
        top: 'calc(50% - 6px)',
      },
    },

    MuiButtonBase: {
      root: {
        '&:active': {
          transform: 'translateY(1px)',
        },
      },
    },

    MuiIconButton: {
      root: {
        border: `1px solid ${fade(defaultTheme.palette.common.black, 0.1)}`,
        color: defaultTheme.palette.text.primary,
        transition: `border ${BTN_TRANSITION_TIME}s`,

        '&:hover': {
          borderColor: fade(defaultTheme.palette.common.black, 0.3),
          backgroundColor: 'none',
        },
      },
    },

    MuiButton: {
      root: {
        borderRadius: 12,
        height: 44,
        padding: defaultTheme.spacing(0, 3),
        textTransform: 'none',
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 1,

        '&$disabled': {
          pointerEvents: 'none',
          borderColor: fade(defaultTheme.palette.common.black, 0),

          '&:active': {
            transform: 'none',
          },

          '&:hover': {
            borderColor: fade(defaultTheme.palette.common.black, 0),
          },
        },
      },

      label: {
        alignItems: 'center',
        position: 'relative',
        whiteSpace: 'nowrap',
      },

      sizeLarge: {
        height: 48,
        fontSize: 16,
      },

      sizeSmall: {
        height: 36,
        fontSize: 12,
      },

      contained: {
        backgroundColor: defaultTheme.palette.primary.main,
        overflow: 'hidden',
        transition: `background-color ${BTN_TRANSITION_TIME}s ease-in`,
        color: defaultTheme.palette.common.white,
        boxShadow: 'none',

        '&:hover': {
          color: defaultTheme.palette.common.white,
          backgroundColor: defaultTheme.palette.primary.dark,
          boxShadow: 'none',
        },

        '&:active, &:focus': {
          boxShadow: 'none',
        },

        '&$disabled': {
          color: defaultTheme.palette.common.white,
          backgroundColor: defaultTheme.palette.action.disabledBackground,
        },
      },

      outlined: {
        border: `2px solid ${defaultTheme.palette.background.paper}`,
        overflow: 'hidden',
        transition: `background-color ${BTN_TRANSITION_TIME}s ease-in`,
        color: defaultTheme.palette.primary.main,
        boxShadow: 'none',

        '&$disabled': {
          border: `2px solid ${defaultTheme.palette.background.paper}`,
          color: defaultTheme.palette.action.disabledBackground,
        },

        '&:hover': {
          background: defaultTheme.palette.background.paper,

          '&:before': {
            transform: 'translateY(0)',
          },
        },
      },

      outlinedPrimary: {
        textTransform: 'none',
        border: `2px solid ${defaultTheme.palette.background.paper}`,
        overflow: 'hidden',
        transition: `background-color ${BTN_TRANSITION_TIME}s ease-in`,
        color: defaultTheme.palette.primary.main,
        boxShadow: 'none',

        '&$disabled': {
          border: '1px solid #E6E6E6',
          color: fade(defaultTheme.palette.common.black, 0.4),
        },

        '&:hover': {
          border: `2px solid ${defaultTheme.palette.background.paper}`,
          backgroundColor: defaultTheme.palette.background.paper,
          color: defaultTheme.palette.primary.main,
        },
      },

      outlinedSecondary: {
        border: `2px solid ${defaultTheme.palette.background.paper}`,

        '&:hover': {
          backgroundColor: defaultTheme.palette.background.paper,
          border: `2px solid ${defaultTheme.palette.background.paper}`,
        },
      },

      text: {
        color: defaultTheme.palette.primary.main,
        background: defaultTheme.palette.background.default,
        padding: '6px 20px',

        '&:hover': {
          color: defaultTheme.palette.text.primary,
        },
      },
      textPrimary: {
        '&:hover': {
          color: defaultTheme.palette.text.primary,
          backgroundColor: defaultTheme.palette.background.default,
          boxShadow:
            '0px 0px 10px rgba(38, 49, 64, 0.1), 0px 3px 40px rgba(38, 49, 64, 0.15)',
        },
      },
      textSecondary: {
        '&:hover': {
          color: defaultTheme.palette.text.primary,
          backgroundColor: defaultTheme.palette.background.default,
        },
      },
      iconSizeMedium: {
        '& > *:first-child': {
          fontSize: 16,
        },
      },
    },

    MuiSvgIcon: {
      root: {
        fontSize: 16,
      },
    },

    MuiCheckbox: {
      root: {
        border: 'none',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },

      colorPrimary: {
        '&$checked': {
          '&:hover': {
            color: defaultTheme.palette.primary.dark,
            backgroundColor: 'transparent',
          },
        },
      },
    },

    MuiCard: {
      root: {
        borderRadius: 12,
      },
    },

    MuiTabs: {
      root: {
        minHeight: 40,
      },

      indicator: {
        background: defaultTheme.palette.text.primary,
      },
    },

    MuiTab: {
      root: {
        minWidth: 0,
        minHeight: 40,
        padding: defaultTheme.spacing(1, 0),
        textTransform: 'none',
        fontWeight: 700,
        fontSize: 16,
        transition: 'color 0.2s',

        [defaultTheme.breakpoints.up('sm')]: {
          minWidth: 0,
        },

        '&.Mui-selected': {
          color: defaultTheme.palette.text.primary,
        },

        '& + &': {
          marginLeft: defaultTheme.spacing(3),
        },
      },

      textColorInherit: {
        opacity: 1,
        color: fade(defaultTheme.palette.text.primary, 0.3),
      },
    },

    MuiDialog: {
      paper: {
        margin: defaultTheme.spacing(4, 1),
        padding: defaultTheme.spacing(4, 2.5),
        borderRadius: 22,

        [defaultTheme.breakpoints.up('md')]: {
          margin: defaultTheme.spacing(4, 4),
          padding: defaultTheme.spacing(3, 5),
        },
      },

      paperFullWidth: {
        width: `calc(100% - ${defaultTheme.spacing(1)}px)`,
      },
    },

    MuiPaper: {
      rounded: {
        borderRadius: 18,
      },

      outlined: {
        border: `1px solid ${fade('#000', 0.1)}`,
      },
    },

    MuiTableCell: {
      root: {
        padding: defaultTheme.spacing(2),
      },

      head: {
        paddingTop: defaultTheme.spacing(1.75),
        paddingBottom: defaultTheme.spacing(1.75),
        lineHeight: 1.2,
        fontWeight: 700,
        color: defaultTheme.palette.text.secondary,
        background: '#F3F3F3',
        borderBottom: 'none',

        '&:first-child': {
          borderRadius: '8px 0 0 8px',
        },

        '&:last-child': {
          borderRadius: '0 8px 8px 0',
        },
      },
    },

    MuiCardContent: {
      root: {
        padding: defaultTheme.spacing(2, 2.5),

        '&:last-child': {
          paddingBottom: defaultTheme.spacing(2),
        },
      },
    },
    MuiSnackbar: {
      root: {
        '&&': {
          top: 0,
          right: 0,
          left: 0,
          bottom: 'auto',
          width: '100%',
          transform: 'translateX(0)',
        },
      },
    },
    MuiAlert: {
      root: {
        width: '100%',
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 0,
      },
      standardError: {
        backgroundColor: '#FF362D',
        color: defaultTheme.palette.common.white,
      },
      standardSuccess: {
        color: defaultTheme.palette.common.black,
      },
      message: {
        fontSize: 14,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
      },
    },

    MuiSwitch: {
      root: {
        width: 60,
        height: 32,
        padding: 0,
      },

      switchBase: {
        '&&': {
          border: 'none',
          padding: '4px 4px',
        },

        '&:active': {
          transform: 'none',
        },

        '&&$checked': {
          transform: 'translateX(28px)',
        },
      },

      colorSecondary: {
        '&$checked': {
          color: defaultTheme.palette.text.primary,

          '&:hover': {
            backgroundColor: 'none',
          },
        },
      },

      disabled: {},

      thumb: {
        width: 24,
        height: 24,
        boxShadow: 'none',
      },

      track: {
        borderRadius: 32,
        opacity: 0.18,
        backgroundColor: defaultTheme.palette.text.primary,

        '$switchBase$checked + &': {
          opacity: 0.08,
        },

        '$colorSecondary$checked + &': {
          backgroundColor: defaultTheme.palette.text.primary,
        },
      },
    },

    MuiStep: {
      root: {
        '&&': {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
    MuiStepLabel: {
      iconContainer: {
        paddingRight: 0,
      },
    },
    MuiStepConnector: {
      root: {
        height: 4,
        background: defaultTheme.palette.background.paper,
      },
      active: {
        background: defaultTheme.palette.primary.main,
      },
      completed: {
        background: defaultTheme.palette.primary.main,
      },
      lineHorizontal: {
        borderTopWidth: 0,
      },
    },
    MuiToggleButtonGroup: {
      root: {
        width: '100%',
        borderRadius: 9,
        padding: 2,
        background: defaultTheme.palette.background.paper,
      },
    },
    MuiToggleButton: {
      root: {
        background: defaultTheme.palette.background.paper,
        color: defaultTheme.palette.text.primary,
        border: 'none',
        padding: '9px 28px',
        textTransform: 'lowercase',

        '&&': {
          borderRadius: 9,
          marginLeft: 0,
        },

        [defaultTheme.breakpoints.down('sm')]: {
          padding: '9px 21px',
        },
        '&.Mui-selected': {
          backgroundColor: defaultTheme.palette.background.default,
          color: defaultTheme.palette.text.primary,
          fontWeight: 'bold',
        },
      },
      label: {
        whiteSpace: 'nowrap',
      },
    },
    MuiSkeleton: {
      root: {
        backgroundColor: defaultTheme.palette.background.paper,
      },
    },
  },
} as ThemeOptions);
