import { makeStyles, Theme } from '@material-ui/core';

export const useTxViewStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(0, 6, 3, 6),
    display: 'grid',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  progressBar: {
    margin: theme.spacing(4, 0),
  },
  closeBtn: {
    position: 'absolute',
    top: theme.spacing(2.5),
    right: theme.spacing(2.5),
    zIndex: 999,
    width: theme.spacing(4),
    minWidth: 0,
    height: theme.spacing(4),
    padding: 0,

    borderRadius: '50%',
    color: theme.palette.text.secondary,

    [theme.breakpoints.up('md')]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  stepper: {
    margin: theme.spacing(1, 13),
  },
  stepTitle: {
    fontSize: '36px',
    lineHeight: '44px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    margin: theme.spacing(3, 0, 6),
    fontSize: '16px',
  },

  grid: {
    display: 'grid',
    flexDirection: 'column',
  },
  gridRow: {
    display: 'grid',
    flexDirection: 'row',
    gridTemplateColumns: 'auto auto',
    borderBottom: `1px solid ${theme.palette.background.default}`,
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  gridCellLabel: {
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '17px',
    color: theme.palette.text.secondary,
  },
  gridCellValue: {
    justifySelf: 'flex-end',
  },
  footerBtn: {
    '& button': {
      width: '100%',
      marginTop: theme.spacing(3),
    },
  },
}));
