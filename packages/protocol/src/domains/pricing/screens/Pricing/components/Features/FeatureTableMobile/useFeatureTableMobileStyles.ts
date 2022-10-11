import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useFeatureTableMobileStyles = makeStyles<Theme>(theme => ({
  root: {},
  title: {
    fontSize: 24,
    lineHeight: '27.6px',
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: 4,
  },
  plan: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 400,
    color: theme.palette.grey[600],
  },
  summary: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 400,
    color: theme.palette.text.primary,
    paddingBottom: 12,
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
  },
  included: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 400,
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& svg': {
      width: 24,
      height: 24,
      color: theme.palette.primary.main,
    },
  },
  item: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 12,
    marginTop: 20,
    padding: theme.spacing(2),
  },
  info: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 700,
  },
  liner: {
    background:
      'linear-gradient(270.26deg, #013CD3 0.23%, #6235D0 26.13%, #AF34B1 49.87%, #E85658 76.96%, #FF7710 99.78%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    '-webkit-box-decoration-break': 'clone',
  },
  primary: {
    color: theme.palette.primary.main,
  },
  learnMore: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 16,
    textAlign: 'center',
    marginTop: theme.spacing(2.5),

    '& em': {
      fontStyle: 'normal',
      marginBottom: theme.spacing(1),
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: 20,
  },
  collapse: {
    marginTop: theme.spacing(1.5),
  },
}));
