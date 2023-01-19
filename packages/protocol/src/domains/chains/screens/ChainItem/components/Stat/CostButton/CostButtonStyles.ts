import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useCostButtonStyles = makeStyles()((theme: Theme) => ({
  costButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: theme.spacing(2 * 6),
    minWidth: 'unset',
    height: theme.spacing(2 * 6),
    padding: 0,

    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: theme.spacing(2 * 2.25),

    transition: 'color .3s, background-color .3s, box-shadow .3s',
  },
}));
