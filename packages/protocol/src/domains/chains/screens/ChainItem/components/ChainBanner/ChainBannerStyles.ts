import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 18,
    padding: theme.spacing(2.5, 3.5),
    height: 164,
    overflow: 'hidden',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    justifyContent: 'space-between',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  unblockBtn: {
    display: 'flex',
    alignItems: 'center',
  },
  unblockBtnLabel: {
    fontSize: 16,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  unblockBtnIcon: {
    marginLeft: theme.spacing(1),
    lineHeight: 1,
    fontSize: 14,
  },
  block: {
    display: 'flex',
  },
  left: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  center: {
    flex: 3,
    overflow: 'hidden',
    margin: theme.spacing(0, 4),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2, -2),
      marginBottom: theme.spacing(3),
    },

    '& > div': {
      display: 'flex',
      flexWrap: 'wrap',
      [theme.breakpoints.down('sm')]: {
        flexWrap: 'nowrap',
        overflowX: 'auto',
        marginBottom: theme.spacing(-1),
      },
    },
  },
  right: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
    },
  },
  featureBlock: {
    display: 'flex',
    flex: 1,
    minWidth: 166,
    height: '50%',
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
    alignItems: 'center',
    marginLeft: theme.spacing(2),
  },
  featureBlockWrapper: {
    display: 'flex',
  },
  featureBlockIcon: {
    marginRight: theme.spacing(1.5),
  },
  featureBlockLabel: {
    fontSize: 14,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineClamp: 2,
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
  },
  title: {
    fontSize: 34,
    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    },
  },
  rightCount: {
    fontSize: 45,
  },
  protectIcon: {
    color: 'transparent',
  },
}));
