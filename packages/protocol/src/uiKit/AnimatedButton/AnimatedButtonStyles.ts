import { makeStyles, Theme } from '@material-ui/core';

interface IUseStylesProps {
  isSuccess: boolean;
  width?: number;
}

export const useStyles = makeStyles<Theme, IUseStylesProps>(() => ({
  root: {
    pointerEvents: ({ isSuccess }) => (isSuccess ? 'none' : 'auto'),
    width: ({ width }) => width,
  },
}));
