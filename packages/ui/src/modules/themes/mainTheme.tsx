import {
  alpha,
  lighten,
  ThemeOptions,
  unstable_createMuiStrictModeTheme as createTheme,
} from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import {
  BREAKPOINTS,
  BTN_TRANSITION_TIME,
  NOTIFICATION_AUTO_HIDE_DURATION,
  TEN_SECONDS,
} from '../../../const';
import { CheckboxCheckedIcon, CheckboxIcon } from '../../components/Checkbox';
import { StepIcon } from '../../components/StepIcon';
import { Themes } from './types';

export const FONTS = {
  primary: ['Inter', 'sans-serif'].join(','),
  ttFirsNeueSemiBold: ['TT Firs Neue', 'sans-serif'].join(','),
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
    default: '#F2F5FA',
    paper: '#fff',
  },
  text: {
    primary: '#1F2226',
    secondary: '#9AA1B0',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#4DB58F',
    light: alpha('#4DB58F', 0.15),
  },
  error: {
    main: '#E3453D',
    light: alpha('#E3453D', 0.15),
  },
  warning: {
    main: '#EEA941',
  },
  grey: {
    400: '#E7EBF3',
    500: '#808692',
    600: '#82899A',
    700: '#2E343C',
    900: '#DFE3EB',
  },
};

export const defaultTheme = createTheme({
  spacing: 8,
  palette: PALETTE,
  breakpoints: BREAKPOINTS,
});

export const mainTheme = createTheme({
  spacing: defaultTheme.spacing,
  palette: defaultTheme.palette,
  breakpoints: defaultTheme.breakpoints,

  typography: {
    fontFamily: FONTS.primary,
    color: PALETTE.text?.primary,
  },

  props: {
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
        '#launcher': {
          display: 'none',
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

    MuiDrawer: {
      root: {
        zIndex: `${defaultTheme.zIndex.drawer} !important` as unknown,
      },
    },

    MuiInputBase: {
      root: {
        fontSize: 16,
        border: `2px solid ${defaultTheme.palette.background.default}`,
        transition: 'border 0.2s, background 0.2s',
        backgroundColor: defaultTheme.palette.background.default,

        '&:hover, &.Mui-focused': {
          borderColor: defaultTheme.palette.background.default,
          backgroundColor: defaultTheme.palette.background.paper,
        },

        '&&$disabled': {
          backgroundColor: defaultTheme.palette.background.default,
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
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 700,
        color: '#000',
        transform: 'none',
      },
    },

    MuiOutlinedInput: {
      root: {
        borderRadius: 8,
        border: `2px solid ${defaultTheme.palette.background.default}`,
      },

      input: {
        padding: defaultTheme.spacing(2.3, 2),
        minHeight: defaultTheme.spacing(6.5),
        boxSizing: 'border-box',
      },
    },

    MuiTooltip: {
      tooltip: {
        padding: defaultTheme.spacing(0.875, 2.125, 0.875, 2.125),
        backgroundColor: defaultTheme.palette.common.white,
        color: defaultTheme.palette.text.primary,
        fontSize: 14,
        fontWeight: 'normal',
        border: `1px solid ${alpha(defaultTheme.palette.text.primary, 0.2)}`,
        borderRadius: 8,
      },
    },

    MuiSelect: {
      select: {
        '&:focus, &:hover': {
          backgroundColor: defaultTheme.palette.background.paper,
          borderRadius: 18,
          borderColor: 'transparent',
        },
      },
      outlined: {
        '&&': {
          fontSize: 14,
          padding: '10px 29px 9px 15px',
        },
      },
      iconOpen: {
        color: defaultTheme.palette.text.primary,
      },
      iconOutlined: {
        fontSize: 12,
        right: 16,
        top: 'calc(50% - 6px)',
        color: 'inherit',
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
        border: `1px solid ${alpha(defaultTheme.palette.common.black, 0.1)}`,
        color: defaultTheme.palette.text.primary,
        transition: `border ${BTN_TRANSITION_TIME}s`,

        '&:hover': {
          borderColor: alpha(defaultTheme.palette.common.black, 0.3),
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
          borderColor: alpha(defaultTheme.palette.common.black, 0),

          '&:active': {
            transform: 'none',
          },

          '&:hover': {
            borderColor: alpha(defaultTheme.palette.common.black, 0),
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
        transition: `background-color ${BTN_TRANSITION_TIME}s, color ${BTN_TRANSITION_TIME}s`,
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
        border: `2px solid ${defaultTheme.palette.background.default}`,
        overflow: 'hidden',
        transition: `background-color ${BTN_TRANSITION_TIME}s, color ${BTN_TRANSITION_TIME}s`,
        color: defaultTheme.palette.primary.main,
        boxShadow: 'none',

        '&$disabled': {
          border: `2px solid ${defaultTheme.palette.background.default}`,
          color: defaultTheme.palette.action.disabledBackground,
        },

        '&:hover': {
          background: defaultTheme.palette.background.default,

          '&:before': {
            transform: 'translateY(0)',
          },
        },
      },

      outlinedPrimary: {
        textTransform: 'none',
        border: `2px solid ${defaultTheme.palette.background.default}`,
        overflow: 'hidden',
        transition: `background-color ${BTN_TRANSITION_TIME}s, color ${BTN_TRANSITION_TIME}s`,
        color: defaultTheme.palette.primary.main,
        boxShadow: 'none',

        '&$disabled': {
          border: '1px solid #E6E6E6',
          color: alpha(defaultTheme.palette.common.black, 0.4),
        },

        '&:hover': {
          border: `2px solid ${defaultTheme.palette.background.default}`,
          backgroundColor: defaultTheme.palette.background.default,
          color: defaultTheme.palette.primary.main,
        },
      },

      outlinedSecondary: {
        border: `2px solid ${defaultTheme.palette.background.default}`,

        '&:hover': {
          backgroundColor: defaultTheme.palette.background.default,
          border: `2px solid ${defaultTheme.palette.background.default}`,
        },
      },

      text: {
        color: defaultTheme.palette.primary.main,
        background: defaultTheme.palette.background.paper,
        padding: '6px 20px',

        '&:hover': {
          color: defaultTheme.palette.text.primary,
        },
      },
      textPrimary: {
        '&:hover': {
          color: defaultTheme.palette.text.primary,
          backgroundColor: defaultTheme.palette.background.paper,
          boxShadow:
            '0px 0px 10px rgba(38, 49, 64, 0.1), 0px 3px 40px rgba(38, 49, 64, 0.15)',
        },
      },
      textSecondary: {
        '&:hover': {
          color: defaultTheme.palette.text.primary,
          backgroundColor: defaultTheme.palette.background.paper,
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
        color: alpha(defaultTheme.palette.text.primary, 0.3),
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
        border: `1px solid ${alpha('#000', 0.1)}`,
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
        backgroundColor: defaultTheme.palette.error.main,
        color: defaultTheme.palette.common.white,
      },
      standardSuccess: {
        backgroundColor: defaultTheme.palette.success.main,
        color: defaultTheme.palette.common.white,
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
        background: defaultTheme.palette.background.default,
      },
      active: {
        background: defaultTheme.palette.background.default,
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
        borderRadius: 16,
        padding: 2,
        background: defaultTheme.palette.background.default,
      },
    },
    MuiToggleButton: {
      root: {
        background: defaultTheme.palette.background.default,
        color: defaultTheme.palette.text.primary,
        border: 'none',
        padding: '9px 28px',
        textTransform: 'lowercase',

        '&&': {
          borderRadius: '14px !important',
          marginLeft: '0 !important',
        },

        [defaultTheme.breakpoints.down('sm')]: {
          padding: '9px 21px',
        },
        '&.Mui-selected': {
          backgroundColor: defaultTheme.palette.background.paper,
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
        backgroundColor: '#E2E8F3',
      },
    },
    MuiAccordion: {
      root: {
        '&:before': {
          display: 'none',
        },

        borderTop: `2px solid ${defaultTheme.palette.background.default}`,

        '&:first-of-type': {
          borderTop: 'none',
        },

        '&.Mui-expanded': {
          margin: 0,
        },
      },
    },
    MuiAccordionSummary: {
      root: {
        minHeight: defaultTheme.spacing(8),
        [defaultTheme.breakpoints.down('sm')]: {
          padding: 0,
        },
      },
      content: {
        fontWeight: 'bold',
        fontSize: 16,
        '&.Mui-expanded': {
          margin: defaultTheme.spacing(1.5, 0),
        },
      },
      expandIcon: {
        border: 'none',
      },
    },
    MuiAccordionDetails: {
      root: {
        fontSize: 14,
      },
    },

    MuiDivider: {
      root: {
        height: 2,
        backgroundColor: defaultTheme.palette.background.default,
      },
    },

    MuiChip: {
      root: {
        fontSize: 14,

        '&$disabled': {
          opacity: 1,
          backgroundColor: defaultTheme.palette.background.default,
          color: defaultTheme.palette.text.secondary,
        },
      },
    },
  },
} as ThemeOptions);
