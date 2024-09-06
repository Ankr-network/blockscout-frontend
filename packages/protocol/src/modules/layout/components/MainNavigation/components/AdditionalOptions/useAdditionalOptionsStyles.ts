import { makeStyles } from 'tss-react/mui';

const name = 'AdditionalOptions';

export const useAdditionalOptionsStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
  },
  referralCodeButton: {
    width: 'fit-content',
  },
}));
