import { makeStyles } from 'tss-react/mui';

export const useThemeBlockStyles = makeStyles<void, 'switchTrack'>()(
  (theme, params, classes) => ({
    root: {
      marginTop: theme.spacing(8),
      padding: theme.spacing(7.5),
      borderRadius: 30,
    },
    top: {
      display: 'flex',
      alignItems: 'center',
      borderBottom: `1px solid ${theme.palette.grey[100]}`,
      paddingBottom: theme.spacing(8),
    },
    bottom: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      color: theme.palette.text.primary,
      fontSize: 20,
      lineHeight: '28px',
      fontWeight: 700,
      marginRight: theme.spacing(3),
    },
    info: {
      marginTop: theme.spacing(8),
    },
    description: {
      marginTop: theme.spacing(0.5),
      marginLeft: theme.spacing(12),
    },
    switchRoot: {
      gap: theme.spacing(2),
    },
    switchChecked: {
      [`+ .${classes.switchTrack}`]: {
        backgroundColor: theme.palette.primary.main,
      },
    },
    switchTrack: {
      backgroundColor: theme.palette.background.default,
    },
    label: {
      letterSpacing: '-0.01em',
      color: theme.palette.text.primary,

      fontWeight: 700,
      fontSize: 16,
      lineHeight: '24px',
    },
  }),
);
