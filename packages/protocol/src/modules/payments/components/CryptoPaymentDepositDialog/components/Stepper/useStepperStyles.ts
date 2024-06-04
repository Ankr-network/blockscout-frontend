import { makeStyles } from 'tss-react/mui';

export const useStepperStyles = makeStyles()(() => ({
  alternativeLabel: {
    '&&': {
      marginTop: 0,
    },
  },
  iconContainer: {
    zIndex: 1,
  },
}));
