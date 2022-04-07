import { darken, makeStyles } from '@material-ui/core';

export const useConnectedWalletsDialogStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 5, 0, 5),
  },
  wrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'start',
  },
  headerArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(4.25),
  },
  header: {
    fontSize: 30,
    textAlign: 'left',
  },
  addWalletButton: {
    margin: theme.spacing(0, 0, 0, 1.5),

    '& > button': {
      width: 36,
      minWidth: 36,
      height: 36,
      margin: 0,
      backgroundColor: theme.palette.background.default,

      '&:hover': {
        backgroundColor: darken(theme.palette.background.default, 0.03),
        borderColor: darken(theme.palette.background.default, 0.03),
      },
    },
    '& span > svg': {
      fontSize: 14,
    },
  },
  network: {
    marginBottom: theme.spacing(4.25),
    width: '100%',
  },
  button: {
    height: 24,
    padding: 0,
    alignSelf: 'center',
    marginBottom: theme.spacing(5),

    fontSize: 14,
    color: theme.palette.text.secondary,
    fontWeight: 500,
    transition: '0.2s color',

    marginRight: theme.spacing(1),

    '&:hover': {
      background: 'none',
      color: theme.palette.primary.main,
    },

    '&:last-of-type': {
      marginRight: 0,
    },
  },
  buttonText: {
    marginLeft: theme.spacing(0.5),
  },
}));
