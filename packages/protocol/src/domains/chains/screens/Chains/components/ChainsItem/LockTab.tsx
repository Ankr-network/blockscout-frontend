import { makeStyles, Typography } from '@material-ui/core';
import { ReactNode } from 'react';
import { ReactComponent as LockIcon } from 'uiKit/Icons/lock.svg';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: `${theme.spacing(0.5)}px`,
  },
  icon: {
    color: '#EE6E36',
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    background:
      'linear-gradient(269.98deg, #2F62F1 0.02%, #8D30FF 49.89%, #FF7710 99.98%)',
    [theme.breakpoints.down('lg')]: {
      fontSize: 14,
    },
  },
}));

export const LockTab = ({ title }: { title?: ReactNode }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LockIcon className={classes.icon} />
      <Typography className={classes.title}>{title}</Typography>
    </div>
  );
};
