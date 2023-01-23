import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { Lock } from '@ankr.com/ui';
import { enterpriseColor } from 'uiKit/Theme/themeUtils';

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
    background: enterpriseColor,
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
      <Lock className={classes.icon} />
      <Typography className={classes.title}>{title}</Typography>
    </div>
  );
};
