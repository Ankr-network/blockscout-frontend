import { makeStyles } from 'tss-react/mui';

export const useAddProjectButtonStyles = makeStyles()(theme => ({
  root: {
    height: theme.spacing(12),
    '&&': {
      border: `2px solid ${theme.palette.common.white}`,
    },
  },
  icon: {
    height: 24,
    width: 24,
  },
}));
