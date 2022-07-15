import { alpha, makeStyles } from '@material-ui/core';

export const useClaimFormStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: 600,
    margin: '0 auto',
    padding: theme.spacing(5, 5, 5, 5),
    backgroundColor: theme.palette.background.paper,
  },

  titleArea: {
    margin: theme.spacing(1, 5.75, 7.5, 5.75),
    fontSize: 30,
    textAlign: 'center',
  },
  infoArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: theme.spacing(2, 2.5, 2, 2.5),
    border: `1px solid ${alpha(theme.palette.text.secondary, 0.15)}`,
    borderRadius: 8,
  },
  footerArea: {
    margin: theme.spacing(5, 0, 0, 0),
  },
  checkboxArea: {
    padding: theme.spacing(2.5, 0, 0, 0),

    '& label': {
      marginRight: 0,
      marginLeft: '-2px',
    },
  },

  closeBtn: {
    position: 'absolute',
    top: theme.spacing(2.5),
    right: theme.spacing(2.5),
    width: theme.spacing(4),
    minWidth: 0,
    height: theme.spacing(4),
    padding: 0,
    color: theme.palette.text.secondary,
    borderRadius: '50%',

    [theme.breakpoints.up('md')]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },

  infoTxt: {
    fontSize: 14,
    fontWeight: 700,
  },
  infoVal: {
    fontSize: 16,
    fontWeight: 700,
  },

  checkboxTxt: {
    margin: theme.spacing(0.5, 0, 0, 1),
    fontSize: 13,
    fontWeight: 400,
  },
}));
