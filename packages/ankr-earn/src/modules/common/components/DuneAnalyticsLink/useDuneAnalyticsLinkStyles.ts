import { makeStyles, Theme } from '@material-ui/core';

export const useDuneAnalyticsLinkStyles = makeStyles<Theme>(theme => ({
  analyticsWrapper: {
    display: 'flex',
    margin: theme.spacing(0, 5, 0),
    borderTop: `2px solid ${theme.palette.background.default}`,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    marginRight: '0.2em',
    fontSize: '16px',
    transition: '2s',
    '--main': '#E5E6E9',
    '--bottom': '#C7CCD8',

    '$link:hover &': {
      '--main': 'initial',
      '--bottom': 'initial',
    },

    '& circle, & path': {
      transition: 'fill .2s ease',
    },
  },

  link: {
    lineHeight: '13px',
    fontSize: 13,
  },
}));
