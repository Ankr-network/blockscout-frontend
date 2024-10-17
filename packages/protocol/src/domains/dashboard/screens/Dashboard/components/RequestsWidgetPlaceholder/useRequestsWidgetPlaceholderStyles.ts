import { makeStyles } from 'tss-react/mui';

const name = 'RequestsWidgetPlaceholder';

export const useRequestsWidgetPlaceholderStyles = makeStyles({ name })(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    height: '100%',
  },
  placeholder: {
    border: '0 none',
  },
}));
