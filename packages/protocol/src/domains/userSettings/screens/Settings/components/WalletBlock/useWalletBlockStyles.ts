import { makeStyles } from 'tss-react/mui';

export const usesWalletBlockStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
    gridGap: theme.spacing(7.5),
    justifyContent: 'space-between',
    padding: theme.spacing(7.5),
    borderRadius: 30,

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderRadius: 20,
      padding: theme.spacing(2 * 2.5),
    },
  },
  text: {
    color: theme.palette.text.primary,
    fontSize: 20,
    lineHeight: '28px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  button: {
    whiteSpace: 'nowrap',
  },
}));
