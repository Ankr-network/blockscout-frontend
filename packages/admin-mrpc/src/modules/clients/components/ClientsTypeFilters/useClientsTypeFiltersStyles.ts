import { Theme } from '@mui/material/styles';

import { makeStyles } from 'tss-react/mui';

export const useClientsTypeFiltersStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
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
}));
