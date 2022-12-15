import { makeStyles, Theme } from '@material-ui/core';

export const useTopUpStyles = makeStyles<Theme, { canPayOnlyByCard?: boolean }>(
  theme => ({
    root: {
      background: theme.palette.background.paper,
      borderRadius: 24,
      padding: theme.spacing(2.5, 3.75, 3.25),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',

      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2, 3, 3),
        minWidth: 'auto',
      },

      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2, 3, 0.5),
        minWidth: '100%',
      },
    },
    tabs: {
      display: 'inline-flex',

      border: props =>
        props.canPayOnlyByCard
          ? ''
          : `2px solid ${theme.palette.background.default}`,
      borderRadius: theme.spacing(1.75),

      background: theme.palette.background.default,

      marginBottom: theme.spacing(1.5),

      '& > div': {
        width: '100%',

        '& > div': {
          width: '100%',
        },
      },
    },
  }),
);
