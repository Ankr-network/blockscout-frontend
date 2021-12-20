import { makeStyles, Theme } from '@material-ui/core';

export const useStakeStats = makeStyles<Theme>(theme => ({
  box: {
    position: 'relative',
    padding: 0,
    maxWidth: 700,
    margin: theme.spacing(0, 'auto', 4, 'auto'),
    borderRadius: 18,
    border: 'none',
  },

  statisticWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: theme.spacing(4.5, 0),
  },

  statistic: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,

    '&:after': {
      position: 'absolute',
      top: '50%',
      right: 0,
      content: '""',
      display: 'block',
      backgroundColor: `${theme.palette.background.default}`,
      height: theme.spacing(8.5),
      width: theme.spacing(0.25),
      transform: 'translate(-50%, -50%)',
    },

    '&:last-of-type:after': {
      display: 'none',
    },
  },

  statisticLabel: {
    color: `${theme.palette.text.secondary}`,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },

  statisticValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  statisticDivider: {
    backgroundColor: `${theme.palette.background.default}`,
    height: theme.spacing(8.5),
    width: theme.spacing(0.25),
  },
}));
