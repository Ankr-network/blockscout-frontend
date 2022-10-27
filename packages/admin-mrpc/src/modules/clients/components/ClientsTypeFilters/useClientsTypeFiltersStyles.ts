import { Theme } from '@mui/material/styles';

import { makeStyles } from 'tss-react/mui';

export const useClientsTypeFiltersStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconFilter: {
    marginRight: theme.spacing(2),
  },
  counter: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    color: 'white',
    fontWeight: theme.typography.fontWeightBold,
    width: 20,
    height: 20,
    marginLeft: theme.spacing(2),
    fontSize: theme.typography.fontSize,
  },
  button: {
    minWidth: 0,
    textTransform: 'none',
    marginRight: 28,
    color: theme.palette.grey['600'],
    fontSize: 28,
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  buttonActive: {
    color: theme.palette.primary.main,
  },
  buttonClear: {
    width: '100%',
    textAlign: 'center',
    color: theme.palette.error.main,
    fontWeight: theme.typography.fontWeightBold,
    border: '2px solid #F2F5FA',
    borderRadius: '14px',
  },
}));
