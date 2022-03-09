import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 18,
    padding: theme.spacing(3, 3.5),
    height: 180,
    overflow: 'hidden',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      height: 184,
    },
    justifyContent: 'space-between',
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  unblockBtn: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    padding: theme.spacing(1, 2),
    fontSize: 16,
    color: theme.palette.common.black,
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: {
      height: 34,
      marginTop: 0,
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
    position: 'relative',
    flex: 3,
    overflow: 'hidden',
    margin: theme.spacing(0, 2),
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(2, 0),
      marginTop: theme.spacing(0),
    },

    '& > div': {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexWrap: 'wrap',
      [theme.breakpoints.down('md')]: {
        flexWrap: 'nowrap',
        overflowX: 'auto',
        marginBottom: theme.spacing(-2),
        marginTop: 0,
      },
    },
  },
  right: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  featureBlock: {
    display: 'flex',
    flex: '1 0 33%',
    minWidth: 160,
    maxWidth: 198,
    height: '50%',
    [theme.breakpoints.down('md')]: {
      height: '100%',
      '&:first-child': {
        marginLeft: 0,
      },
      alignItems: 'center',
      marginLeft: theme.spacing(2),
    },
    alignItems: 'flex-start',
    marginLeft: 0,
  },
  featureBlockWrapper: {
    display: 'flex',
  },
  featureBlockIcon: {
    flexShrink: 0,
    fontSize: 20,
    marginRight: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
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
    [theme.breakpoints.down('md')]: {
      fontSize: 24,
    },
  },
  rightCount: {
    fontSize: 45,
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
      lineHeight: 1.2,
    },
  },
  reqPerDay: {
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
    },
  },
  protectIcon: {
    color: 'transparent',
  },
  rightOverlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '10%',
    height: '100%',
    background:
      'linear-gradient(270deg, #356DF3 0%, rgba(53, 109, 243, 0) 100%)',
  },
}));
