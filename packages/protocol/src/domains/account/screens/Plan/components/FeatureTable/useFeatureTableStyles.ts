import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    tableLayout: 'fixed',
    '& tr': {
      verticalAlign: 'top',
    },
    '& th': {
      background: 'transparent',
    },
  },
  title: {
    fontSize: 34,
    fontWeight: 600,
  },
  subTitle: {
    fontSize: 17,
  },
  subTitleGrey: {
    fontSize: 17,
    color: theme.palette.grey[600],
  },
  subTitleGreyCost: {
    display: 'inline',
    fontSize: 16,
    color: theme.palette.grey[600],
  },
  rowText: {
    fontSize: 17,
    fontWeight: 700,
  },
  rowTextSub: {
    fontSize: 17,
  },
  unblockBtn: {
    color: theme.palette.primary.main,
    padding: 0,
    background: 'none',
    '&:hover': {
      background: 'none',
      color: theme.palette.primary.main,
    },
    height: 'auto',
  },
  unblockBtnLabel: {
    fontSize: 16,
    fontWeight: 600,
  },
  unblockBtnIcon: {
    lineHeight: 1,
    fontSize: '14px !important',
  },
  iconPrimary: {
    color: theme.palette.primary.main,
  },
  iconGrey: {
    color: theme.palette.grey[600],
  },
  textSecondary: {
    color: theme.palette.grey[600],
  },
  unlockBtn: {
    marginTop: theme.spacing(1),
  },
}));
