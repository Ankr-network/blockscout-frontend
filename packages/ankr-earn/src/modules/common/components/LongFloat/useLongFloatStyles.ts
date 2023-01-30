import { makeStyles } from '@material-ui/core';

export const useLongFloatStyles = makeStyles(() => ({
  root: {
    fontSize: 16,
  },
  zeroes: {
    verticalAlign: 'sub',
    fontSize: '0.8em',
  },
}));
