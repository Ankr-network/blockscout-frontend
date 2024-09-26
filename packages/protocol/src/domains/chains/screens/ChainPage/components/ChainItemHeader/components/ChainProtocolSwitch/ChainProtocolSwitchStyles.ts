import { makeStyles } from 'tss-react/mui';

export const useChainProtocolSwitchStyles = makeStyles<void, 'switchTrack'>()(
  (theme, _params, classes) => ({
    root: {
      gap: theme.spacing(2),
    },
    switchChecked: {
      [`+ .${classes.switchTrack}`]: {
        backgroundColor: theme.palette.primary.main,
      },
    },
    switchTrack: {
      backgroundColor: theme.palette.secondary.dark,
    },
    label: {
      letterSpacing: '-0.01em',
      color: theme.palette.grey[600],

      fontWeight: 600,
      fontSize: 14,
      lineHeight: '24px',
    },
  }),
);
