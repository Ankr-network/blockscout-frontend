import { Theme } from '@material-ui/core';
import { makeStyles, StyleRules } from '@material-ui/core/styles';

export const useMyRewardsClaimModalStyles = makeStyles<Theme>(
  (theme: Theme): StyleRules => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },

    containerArea: {
      position: 'relative',
      width: 600,
      height: 'auto',
      margin: theme.spacing('90px', 'auto', '90px', 'auto'),
      backgroundColor: theme.palette.background.paper,
      borderRadius: 18,
    },
    closeArea: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
    },
    bodyArea: {
      margin: theme.spacing('70px', '50px', '50px', '50px'),
    },

    titleArea: {
      margin: theme.spacing(0, 0, '23px', 0),
      textAlign: 'center',
    },
    titleSuccessArea: {
      marginRight: theme.spacing(9),
      marginLeft: theme.spacing(9),
    },
    infoMsgArea: {
      fontSize: 14,
      fontWeight: 400,
      textAlign: 'center',
    },
    selectFieldArea: {
      margin: theme.spacing(0, 0, '20px', 0),

      '& > button': {
        width: 500,
        height: 50,
        margin: 0,
        backgroundColor: theme.palette.background.default,
        border: `2px solid ${theme.palette.background.default}`,

        '&:hover': {
          backgroundColor: theme.palette.common.white,
          border: `2px solid ${theme.palette.background.default}`,
        },
        '&[disabled]': {
          border: `2px solid ${theme.palette.background.default}`,
          opacity: 0.75,
        },
      },
      '& > button > span': {
        justifyContent: 'flex-start',
        margin: theme.spacing('3px', 0, 0, 0),
      },
      '& > button > span > span': {
        position: 'absolute',
        top: 5,
        right: 0,
      },
    },
    checkboxArea: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      color: '#9aa1b0',

      '& label': {
        width: 'auto',
        height: 17,
        marginRight: 0,
        marginLeft: 0,
      },
      '& label > span:first-child': {
        margin: theme.spacing('1px', 1, 0, '1px'),
      },
    },
    inputFieldArea: {
      margin: theme.spacing('30px', 0, 0, 0),
    },
    inputFieldLabelArea: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: theme.spacing(0, 0, 2, 0),
    },
    hintEthArea: {
      display: 'inline-flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: theme.spacing(3, 0, '18px', 0),
      fontSize: 14,
      fontWeight: 400,
    },
    hintEthSuccessArea: {
      margin: theme.spacing('40px', 0, 0, 0),
    },
    messageArea: {
      fontWeight: 'normal',
      textAlign: 'center',
    },
    actionArea: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing('32px', 0, 0, 0),
    },

    closeBtn: {
      border: 'none',

      '& a:hover': {
        backgroundColor: 'inherit',
      },
    },

    selectFieldLabel: {
      margin: theme.spacing(0, 0, 2, 0),
      fontWeight: 'bold',
    },
    selectFieldMenu: {
      width: 500,
      marginTop: theme.spacing(6.65),
    },

    checkboxTxt: {
      fontSize: 14,
    },

    inputFieldLabel: {
      fontWeight: 'bold',
    },
    inputField: {
      width: '100%',

      '& > div': {
        borderRadius: 12,
      },
      '& > p': {
        margin: theme.spacing(1, 0, 0, 0),
        fontSize: 14,
      },
      '& input': {
        minHeight: 46,
      },
    },

    hintEthSplitter: {
      display: 'inline-block',
      width: 'auto',
      height: 22,
      margin: theme.spacing(0, 1, 0, 0),
      borderLeft: `2px solid ${theme.palette.primary.main}`,
    },
    hintEthTxt: {},

    actionBtn: {},
    actionSuccessBtn: {
      paddingRight: 45,
      paddingLeft: 45,
    },
    actionBtnTxt: {
      margin: theme.spacing('3px', 0, 0, '4px'),
    },
  }),
);
