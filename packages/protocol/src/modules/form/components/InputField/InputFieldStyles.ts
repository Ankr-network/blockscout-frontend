import { makeStyles, createStyles } from '@material-ui/styles';

export const useInputFieldStyles = makeStyles(() =>
  createStyles({
    root: {
      '& > p': {
        marginLeft: 0,
        marginRight: 0,
      },
    },
  }),
);
