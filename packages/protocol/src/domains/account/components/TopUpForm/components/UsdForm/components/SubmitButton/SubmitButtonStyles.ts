import { makeStyles } from 'tss-react/mui';

export const useSubmitButtonStyles = makeStyles<boolean>()(
  (theme, hasCancelLabel) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',

      gap: theme.spacing(3),
    },
    button: {
      height: 48,

      borderRadius: 17,
    },
    cancelLabel: {
      visibility: hasCancelLabel ? 'visible' : 'hidden',

      color: theme.palette.grey[600],

      textAlign: 'center',

      fontSize: 14,
      lineHeight: '140%',
    },
  }),
);
