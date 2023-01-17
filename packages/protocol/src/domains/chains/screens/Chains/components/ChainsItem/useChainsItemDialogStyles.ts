import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainsItemDialogStyles = makeStyles()((theme: Theme) => ({
  paperRoot: {
    margin: 0,
    padding: theme.spacing(2 * 0.25),
    borderRadius: theme.spacing(2 * 4.5, 2 * 4.5, 2 * 5, 2 * 5),
    overflow: 'overlay',
    background:
      'linear-gradient(270.26deg, #013CD3 0.23%, #6235D0 26.13%, #AF34B1 49.87%, #E85658 76.96%, #FF7710 99.78%)',
  },
  dialogTitle: {
    zIndex: 1,
    paddingTop: 30,
    marginBottom: 0,
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(2 * 4.5, 2 * 4.5, 0, 0),
    '& button': {
      marginRight: 30,
    },
  },
  root: {
    marginTop: theme.spacing(2 * 5),
    width: 580,
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: 'unset',
    },
  },
  plan: {
    background: theme.palette.common.white,
    borderRadius: theme.spacing(0, 0, 2 * 5, 2 * 5),
    padding: theme.spacing(2 * 0.5),
    position: 'relative',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    background: theme.palette.common.white,
    borderRadius: theme.spacing(0, 0, 2 * 4.5, 2 * 4.5),
    padding: theme.spacing(2 * 4.5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2 * 2.5),
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
    marginBottom: theme.spacing(2 * 2.25),
  },
  titleWrapper: {
    paddingBottom: theme.spacing(2 * 4),
    marginBottom: theme.spacing(2 * 4),
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
    background:
      'linear-gradient(270.26deg, #013CD3 0.23%, #6235D0 26.13%, #AF34B1 49.87%, #E85658 76.96%, #FF7710 99.78%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
  label: {
    marginBottom: theme.spacing(2 * 1),
    fontSize: 20,

    [theme.breakpoints.down('sm')]: {
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
    padding: theme.spacing(0, 2 * 2.5),
    fontSize: 12,
  },
  features: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2 * 1.25),
    marginBottom: theme.spacing(2 * 5),
    justifyContent: 'center',
    rowGap: theme.spacing(2 * 0.25),
    columnGap: theme.spacing(2 * 0.5),
  },
  feature: {
    background: theme.palette.background.default,
    borderRadius: 12,
    padding: theme.spacing(2 * 1, 2 * 1.5),
    display: 'inline-block',
    marginBottom: theme.spacing(2 * 0.5),
  },
  featureText: {
    fontWeight: 400,
  },
  link: {
    '&:hover': {
      color: theme.palette.background.default,
    },
  },
}));
