import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useTopUpStyles = makeStyles<{ canPayOnlyByCard?: boolean }>()(
  (theme: Theme, props: { canPayOnlyByCard?: boolean }) => ({
    root: {
      background: theme.palette.background.paper,
      borderRadius: 24,
      padding: theme.spacing(2 * 2.5, 2 * 3.75, 2 * 3.25),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',

      [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(2 * 2, 2 * 3, 2 * 3),
        minWidth: 'auto',
      },

      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2 * 2, 2 * 3, 2 * 0.5),
        minWidth: '100%',
      },
    },
    tabs: {
      display: 'inline-flex',

      border: props.canPayOnlyByCard
        ? ''
        : `2px solid ${theme.palette.background.default}`,
      borderRadius: theme.spacing(2 * 1.75),

      background: theme.palette.background.default,

      marginBottom: theme.spacing(2 * 1.5),

      '& > div': {
        width: '100%',

        '& > div': {
          width: '100%',
        },
      },
    },
  }),
);
