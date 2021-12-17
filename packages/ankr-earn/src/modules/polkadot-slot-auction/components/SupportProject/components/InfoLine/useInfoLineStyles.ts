import { makeStyles } from '@material-ui/core/styles';

export const useInfoLineStyles = makeStyles(theme => ({
  line: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 35,
  },
  infoText: {
    fontSize: 18,
    lineHeight: '21px',
    display: 'flex',
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 22,
    lineHeight: '27px',
    fontWeight: 700,
  },
  question: {
    padding: '0 8px',
  },
}));
