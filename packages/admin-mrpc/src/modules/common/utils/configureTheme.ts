import { Theme } from '@mui/material/styles';
import { inputBaseClasses, selectClasses } from '@mui/material';

export const configureTheme = (theme: Theme) => {
  return {
    ...theme,
    shape: {
      borderRadius: theme.spacing(4),
    },
    components: {
      ...theme.components,
      MuiTooltip: {
        ...theme.components?.MuiTooltip,
        defaultProps: {
          ...theme.components?.MuiTooltip?.defaultProps,
          placement: 'left',
        },
        styleOverrides: {
          ...theme.components?.MuiTooltip?.styleOverrides,
          tooltip: {
            fontSize: 16,
            backgroundColor: theme.palette.background.paper,
            color: 'black',
            boxShadow: theme.shadows,
            borderRadius: theme.spacing(4),
            padding: theme.spacing(2),
          },
        },
      },
      MuiPaper: {
        ...theme.components?.MuiPaper,
        defaultProps: {
          ...theme.components?.MuiPaper?.defaultProps,
          elevation: 0,
        },
        styleOverrides: {
          ...theme.components?.MuiPaper?.styleOverrides,
          paper: {
            borderRadius: theme.shape.borderRadius,
            boxShadow: 'none',
          },
        },
      },
      MuiInput: {
        ...theme.components?.MuiInput,
        styleOverrides: {
          ...theme.components?.MuiInput?.styleOverrides,
          root: {
            [`&.${inputBaseClasses.focused}`]: {
              // fix for focused select input background color
              [`& .${selectClasses.select}`]: {
                backgroundColor: theme.palette.background.paper,
              },
            },
          },
        },
      },
    },
  };
};
