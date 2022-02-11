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
      margin: theme.spacing('44px', 0, 0, 0),
    },
    hintArea: {
      display: 'inline-flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 'auto',
      margin: theme.spacing('44px', 0, 0, 0),
      fontSize: 14,
      fontWeight: 400,
    },
    checkboxArea: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing('39px', 0, 0, 0),

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

    hintSplitter: {
      display: 'inline-block',
      width: 'auto',
      height: 22,
      margin: theme.spacing(0, 1, 0, 0),
      borderLeft: `2px solid ${theme.palette.primary.main}`,
    },
    hintTxt: {},

    checkboxTxt: {
      margin: theme.spacing('1px', 0, 0, 0),
      fontSize: 13,
      fontWeight: 400,
    },
  }),
);
