import { makeStyles } from 'tss-react/mui';

const name = 'AmountIntpuLabel';

export const useLabelStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(3),
  },
  title: {
    color: theme.palette.text.primary,
  },
  bonuses: {
    color: theme.palette.text.secondary,
  },
}));
