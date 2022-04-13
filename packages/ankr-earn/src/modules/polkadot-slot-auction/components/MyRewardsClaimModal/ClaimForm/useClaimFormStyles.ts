import { makeStyles } from '@material-ui/core/styles';

export const useClaimFormStyles = makeStyles(theme => ({
  titleArea: {
    margin: theme.spacing(0, 0, 2.875, 0),
    textAlign: 'center',
  },
  infoMsgArea: {
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'center',
  },
  selectFieldArea: {
    margin: theme.spacing(0, 0, 2.5, 0),

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
    margin: theme.spacing(3.75, 0, 0, 0),
  },
  inputFieldLabelArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: theme.spacing(0, 0, 2, 0),
  },
  infoArea: {
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: theme.spacing(3, 0, 2.25, 0),
    fontSize: 14,
    fontWeight: 400,
  },
  infoWarnArea: {
    marginTop: theme.spacing(0.75),
  },
  actionArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(4, 0, 0, 0),
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

  infoSplitter: {
    display: 'inline-block',
    width: 'auto',
    height: 22,
    margin: theme.spacing(0, 1, 0, 0),
    borderLeft: `2px solid ${theme.palette.primary.main}`,
  },
  infoTxt: {},

  infoWarnSplitter: {
    height: 40,
    borderLeftColor: theme.palette.error.main,
  },
  infoWarnTxt: {
    color: theme.palette.error.main,
  },

  actionBtn: {},
}));
