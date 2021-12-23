import { makeStyles } from '@material-ui/core/styles';

export const useInfoLineStyles = makeStyles(theme => ({
  line: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 36,
  },
  infoText: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '21px',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '27px',
  },
  question: {
    padding: '0 8px',
  },
}));
