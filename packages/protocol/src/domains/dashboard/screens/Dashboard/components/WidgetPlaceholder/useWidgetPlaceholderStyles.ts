import { makeStyles } from 'tss-react/mui';

const name = 'WidgetPlaceholder';

export const useWidgetPlaceholderStyles = makeStyles({ name })(() => ({
  placeholder: {
    justifyContent: 'center',

    height: '100%',
    maxWidth: '100%',

    border: '0 none',
  },
}));
