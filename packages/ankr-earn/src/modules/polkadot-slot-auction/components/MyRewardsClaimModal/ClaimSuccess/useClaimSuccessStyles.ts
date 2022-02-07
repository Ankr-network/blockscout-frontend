import { makeStyles } from '@material-ui/core/styles';

export const useClaimSuccessStyles = makeStyles(theme => ({
  root: {},

  titleArea: {
    margin: theme.spacing(0, 9, 2.875, 9),
    textAlign: 'center',
  },
  messageArea: {
    display: 'inline-block',
    margin: theme.spacing(1.125, 8.75, 0, 8.75),
    fontWeight: 'normal',
    textAlign: 'center',
  },
  actionArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(4, 0, 0, 0),
  },
  hintEthArea: {
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: theme.spacing(5, 0, 0, 0),
    fontSize: 14,
    fontWeight: 400,
  },

  actionBtn: {
    paddingRight: 45,
    paddingLeft: 45,
  },
  actionBtnTxt: {
    margin: theme.spacing('3px', 0, 0, '4px'),
  },

  hintEthSplitter: {
    display: 'inline-block',
    width: 'auto',
    height: 22,
    margin: theme.spacing(0, 1, 0, 0),
    borderLeft: `2px solid ${theme.palette.primary.main}`,
  },
  hintEthTxt: {},
}));
