import { Theme } from '@material-ui/core';
import { makeStyles, StyleRules } from '@material-ui/core/styles';

export const useClaimFormStyles = makeStyles<Theme>(
  (theme: Theme): StyleRules => ({
    titleArea: {
      textAlign: 'center',
    },
    actionArea: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(5.5, 0, 0, 0),
    },
    checkboxArea: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(4.875, 0, 0, 0),

      '& label': {
        height: 17,
        marginRight: 0,
        marginLeft: 0,
      },
      '& label > span:first-child': {
        margin: theme.spacing('1px', 1, 0, '1px'),
      },
    },

    actionBtn: {
      width: 390,
    },
    actionBtnTxt: {},

    checkboxTxt: {
      margin: theme.spacing('1px', 0, 0, 0),
      fontSize: 13,
      fontWeight: 400,
    },
  }),
);
