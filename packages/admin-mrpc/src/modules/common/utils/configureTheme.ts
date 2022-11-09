import { Theme } from '@mui/material/styles';
import {
  inputBaseClasses,
  selectClasses,
  tableContainerClasses,
} from '@mui/material';

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
          root: {
            // fix for tableContainer background color
            [`&.${tableContainerClasses.root}`]: {
              backgroundColor: theme.palette.background.default,
            },
          },
        },
      },
      MuiTable: {
        ...theme.components?.MuiTable,
        styleOverrides: {
          ...theme.components?.MuiTable?.styleOverrides,
          root: {
            borderCollapse: 'separate',
            borderSpacing: '0 10px',
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
                transition: 'background-color .3s',
              },
            },
          },
        },
      },
    },
  };
};
