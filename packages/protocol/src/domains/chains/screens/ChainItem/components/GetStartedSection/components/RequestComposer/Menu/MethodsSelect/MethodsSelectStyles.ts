import { makeStyles, Theme } from '@material-ui/core';

export const iconId = 'MethodsSelectIcon';

type Params = {
  error?: boolean;
  open: boolean;
};

export const useMethodsSelectStyles = makeStyles<Theme, Params>(theme => ({
  label: {
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: 16,
    marginBottom: theme.spacing(1.75),
  },

  popper: {
    boxShadow:
      '0px 2px 5px rgba(31, 34, 38, 0.1), 0px 3px 15px rgba(31, 34, 38, 0.1)',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0.5),
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
    gridGap: theme.spacing(0.5),

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
    padding: 0,
    minHeight: 'auto',
    backgroundColor: 'transparent !important',

    '& > *': {
      fontSize: 16,
      width: '100%',
      height: 40,
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(1, 1.5),
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
      },
    },
  },

  optionTooltip: {
    border: 'none',
    borderRadius: 14,
    boxShadow:
      '0px 2px 5px rgba(31, 34, 38, 0.1), 0px 3px 15px rgba(31, 34, 38, 0.1)',
  },

  iconButton: {
    padding: 0,
    border: 'none',
  },

  textFieldInput: {
    paddingRight: theme.spacing(1),

    [`& #${iconId}`]: {
      transition: `all 140ms ease-in`,
      color: ({ open }) =>
        open ? theme.palette.text.primary : theme.palette.grey[600],
      transform: ({ open }) => (open ? 'rotateX(180deg)' : 'rotateX(0deg)'),
    },

    [`&.Mui-focused #${iconId}`]: {},
  },

  helperText: {
    color: ({ error }) => (error ? theme.palette.error.main : undefined),
  },

  extra: {
    color: theme.palette.text.secondary,
    fontWeight: 400,
    marginTop: theme.spacing(1.5),
  },
}));
