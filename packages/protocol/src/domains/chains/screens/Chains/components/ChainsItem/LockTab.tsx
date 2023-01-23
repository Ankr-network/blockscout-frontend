import { ReactNode } from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { ReactComponent as LockIcon } from 'uiKit/Icons/lock.svg';
import { Typography } from '@mui/material';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2 * 0.5),
  },
  icon: {
    '&&': {
      color: '#EE6E36',
    },
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    background:
      'linear-gradient(269.98deg, #2F62F1 0.02%, #8D30FF 49.89%, #FF7710 99.98%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    [theme.breakpoints.down('xl')]: {
      fontSize: 14,
    },
  },
}));

export const LockTab = ({ title }: { title?: ReactNode }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <LockIcon className={classes.icon} />
      <Typography className={classes.title}>{title}</Typography>
    </div>
  );
};
