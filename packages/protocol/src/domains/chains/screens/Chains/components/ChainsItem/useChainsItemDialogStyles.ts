import { makeStyles, Theme } from '@material-ui/core';

export const useChainsItemDialogStyles = makeStyles<Theme>(theme => ({
  paperRoot: {
    margin: 0,
    padding: theme.spacing(0.25),
    borderRadius: theme.spacing(5),
    overflow: 'overlay',
    background:
      'linear-gradient(270.26deg, #013CD3 0.23%, #6235D0 26.13%, #AF34B1 49.87%, #E85658 76.96%, #FF7710 99.78%)',
  },
  dialogTitle: {
    zIndex: 1,
    top: 30,
    right: 30,
    marginBottom: 0,
  },
  root: {
    marginTop: theme.spacing(5),
    position: 'relative',
    width: 580,
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      width: 'unset',
    },
  },
  plan: {
    background: theme.palette.common.white,
    borderRadius: 40,
    padding: 4,
    position: 'relative',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    background: theme.palette.common.white,
    borderRadius: 36,
    padding: 36,
    [theme.breakpoints.down('xs')]: {
      padding: 20,
    },
  },
  premium: {
    '& $container': {
      background: theme.palette.common.white,
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logo: {
    width: 80,
    marginBottom: 28,
  },
  titleWrapper: {
    paddingBottom: theme.spacing(4),
    marginBottom: theme.spacing(4),
    borderBottom: '1px solid #E7EBF3',
    textAlign: 'center',
  },
  title: {
    display: 'inline',
    fontSize: 35,
  },
  premiumTitle: {
    display: 'inline',
    fontSize: 35,
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    background:
      'linear-gradient(270.26deg, #013CD3 0.23%, #6235D0 26.13%, #AF34B1 49.87%, #E85658 76.96%, #FF7710 99.78%)',
  },
  label: {
    marginBottom: theme.spacing(1),
    fontSize: 20,

    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  plusWrapper: {
    position: 'relative',
  },
  plus: {
    position: 'absolute',
    top: -41,
    left: -40,
    color: theme.palette.primary.main,
    background: theme.palette.background.paper,
    padding: '0 20px',
    fontSize: 12,
  },
  features: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: theme.spacing(5),
    justifyContent: 'center',
    rowGap: theme.spacing(0.25),
    columnGap: theme.spacing(0.5),
  },
  feature: {
    background: theme.palette.background.default,
    borderRadius: 12,
    padding: theme.spacing(1, 1.5),
    display: 'inline-block',
    marginBottom: theme.spacing(0.5),
  },
  featureText: {
    fontWeight: 400,
  },
}));
