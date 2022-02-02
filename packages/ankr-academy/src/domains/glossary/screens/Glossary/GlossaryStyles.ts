import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const useGlossaryStyles = makeStyles<Theme>(theme =>
  createStyles({
    root: {},
    containerGlossary: {},
    title: {
      marginBottom: theme.spacing(2),
    },
  }),
);
