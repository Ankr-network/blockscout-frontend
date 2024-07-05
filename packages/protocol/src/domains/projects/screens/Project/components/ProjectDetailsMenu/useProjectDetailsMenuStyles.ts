import { makeStyles } from 'tss-react/mui';

export const useProjectDetailsMenuStyles = makeStyles()(theme => ({
  paper: {
    boxShadow:
      '0 2px 5px rgba(31, 34, 38, 0.1), 0 3px 15px rgba(31, 34, 38, 0.1)',
  },
  isActive: {
    backgroundColor: theme.palette.grey[100],
  },
  icon: {
    '&&': {
      color: theme.palette.text.secondary,
    },
  },
  btnMore: {
    backgroundColor: 'transparent',
    boxShadow: `0 0 0 2px ${theme.palette.background.default}`,

    svg: {
      color: theme.palette.primary.main,
    },

    '&:hover': {
      borderColor: theme.palette.grey[100],
      boxShadow: `0 0 0 2px ${theme.palette.grey[100]}`,
    },
  },
}));
