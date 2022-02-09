import { Theme } from '@material-ui/core';
import { makeStyles, StyleRules } from '@material-ui/core/styles';

export const useClaimSuccessStyles = makeStyles<Theme>(
  (theme: Theme): StyleRules => ({
    root: {},

    titleArea: {
      textAlign: 'center',
    },
    messageArea: {
      margin: theme.spacing(5, 12, 0, 12),
      fontWeight: 'normal',
      textAlign: 'center',
    },
    actionArea: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(5, 0, 0, 0),
    },

    actionBtn: {
      width: 360,
      margin: theme.spacing(0, 0, '20px', 0),

      '&:last-child': {
        margin: 0,
      },
    },
    actionBtnTxt: {},
  }),
);
