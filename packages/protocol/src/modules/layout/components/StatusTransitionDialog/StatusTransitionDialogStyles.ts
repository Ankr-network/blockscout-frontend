import { makeStyles } from 'tss-react/mui';

import { enterpriseColor } from 'uiKit/Theme/themeUtils';

export const useStatusTransitionDialogStyles = makeStyles()(theme => ({
  paper: {
    padding: theme.spacing(10),
  },
  icon: {
    position: 'absolute',

    display: 'flex',
    justifyContent: 'center',

    width: '100%',
  },
  iconWrapper: {
    minHeight: 48,
    marginBottom: theme.spacing(7.5),
  },
  title: {
    marginBottom: theme.spacing(7.5),

    textAlign: 'center',
    letterSpacing: '-0.04em',
    fontWeight: 700,
    fontSize: 35,
    lineHeight: '40px',
  },
  description: {
    marginBottom: theme.spacing(7.5),
    textAlign: 'center',
    letterSpacing: '-0.01em',
    color: theme.palette.grey[800],
    fontWeight: 400,
    fontSize: 20,
    lineHeight: '28px',

    span: {
      span: {
        background: enterpriseColor,

        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',

        fontWeight: 700,
      },
    },
  },
  button: {
    width: '100%',
    height: 60,

    borderRadius: 20,

    letterSpacing: '-0.01em',
    fontSize: 20,
  },
}));
