import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useTopUpBlockHeaderStyles = makeStyles()((theme: Theme) => ({
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
  },
  link: {
    height: 'auto',
    minWidth: 'auto',
    minHeight: 'unset',
    padding: '0',

    fontSize: 14,
    fontWeight: 500,
    lineHeight: '143%',

    '&:hover': {
      color: theme.palette.grey[900],
      backgroundColor: 'transparent',
    },
  },
  endIcon: {
    margin: 0,
  },
}));
