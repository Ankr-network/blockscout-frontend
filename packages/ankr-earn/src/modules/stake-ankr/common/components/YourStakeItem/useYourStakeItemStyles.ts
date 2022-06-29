import { darken, makeStyles } from '@material-ui/core';

export const useYourStakeItemStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',

    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
    },
  },

  plusWalletButton: {
    display: 'flex',
    height: 40,
    width: 40,
    minWidth: 40,
    margin: theme.spacing(0.5, 0, 0.5, 0.5),
    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 0, 0, 1.5),
    },

    '& > button': {
      width: 36,
      minWidth: 36,
      height: 36,
      margin: 0,

      '&:hover': {
        backgroundColor: darken(theme.palette.background.default, 0.03),
        borderColor: darken(theme.palette.background.default, 0.03),
      },
    },
    '& span > svg': {
      fontSize: 14,
    },
  },

  btnWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',

    [theme.breakpoints.up('md')]: {
      flexWrap: 'nowrap',
    },
  },
}));
