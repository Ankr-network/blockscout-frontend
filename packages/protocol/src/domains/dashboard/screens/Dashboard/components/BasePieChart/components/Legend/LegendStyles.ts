import { makeStyles } from 'tss-react/mui';

export const useLegendStyles = makeStyles()(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr max-content',
    rowGap: theme.spacing(),
    columnGap: theme.spacing(3),
    alignItems: 'center',

    height: '100%',
  },
}));
