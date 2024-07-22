import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const iconId = 'MethodsSelectIcon';

type Params = {
  error?: boolean;
  open: boolean;
};

export const useMethodsSelectStyles = makeStyles<Params>()(
  (theme: Theme, params: Params) => ({
    label: {
      color: theme.palette.text.primary,
      fontWeight: 700,
      fontSize: 16,
      marginBottom: theme.spacing(2 * 1.75),
    },
    popper: {
      boxShadow:
        '0px 2px 5px rgba(31, 34, 38, 0.1), 0px 3px 15px rgba(31, 34, 38, 0.1)',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2 * 0.5),
      borderRadius: 14,
    },

    paper: {
      overflow: 'visible',
    },

    listbox: {
      display: 'flex',
      padding: 0,
      flexDirection: 'column',
      alignItems: 'stretch',
      gridGap: theme.spacing(2 * 0.5),

      '&::-webkit-scrollbar': {
        width: 3,
        height: 3,
      },

      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.grey[300],
        borderRadius: 2,
      },
    },

    listboxOption: {
      '&&': {
        padding: 0,
        margin: 0,
        minHeight: `${theme.spacing(2 * 5)} !important`,
        borderRadius: 16,
        '&:hover': {
          backgroundColor: theme.palette.background.default,
        },
      },

      '& > *': {
        fontSize: 16,
        width: '100%',
        height: 40,
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(0, 2 * 1.5),
        borderRadius: 14,
        transition: 'all 70ms ease-in-out',
      },

      '&[data-focus="true"]': {
        '& > *': {
          backgroundColor: theme.palette.background.default,
        },
      },

      '&[aria-selected="true"]': {
        '& > *': {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.primary.main,
          fontWeight: 600,
          borderRadius: 16,
        },
      },
    },

    optionTooltip: {
      border: 'none',
      borderRadius: 14,
      boxShadow:
        '0px 2px 5px rgba(31, 34, 38, 0.1), 0px 3px 15px rgba(31, 34, 38, 0.1)',
    },

    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(0, 2 * 1.5),
    },

    iconButton: {
      padding: 0,
      border: 'none',
      backgroundColor: 'transparent',
    },

    textFieldInput: {
      paddingRight: theme.spacing(2),

      [`& #${iconId}`]: {
        transition: `all 140ms ease-in`,
        color: params.open
          ? theme.palette.text.primary
          : theme.palette.grey[600],
        transform: params.open ? 'rotateX(180deg)' : 'rotateX(0deg)',
      },
    },

    helperText: {
      color: params.error ? theme.palette.error.main : undefined,
    },

    extra: {
      color: theme.palette.text.secondary,
      fontWeight: 400,
      marginTop: theme.spacing(2 * 1.5),
    },
  }),
);
