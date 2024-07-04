import { makeStyles } from 'tss-react/mui';

export const useSnippetTechnologyTabsStyles = makeStyles()(theme => ({
  title: {
    marginRight: theme.spacing(8.75),
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: theme.spacing(4),
    lineHeight: theme.spacing(6),
    display: 'block',
    width: '100%',

    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(5),
      fontSize: theme.spacing(3),
      lineHeight: theme.spacing(5),
    },
  },
  classNameTabsInner: {
    marginTop: theme.spacing(3),
  },
  classNameTab: {
    '& > div': {
      boxShadow: 'none',
      fontWeight: 700,

      '&:hover': {
        color: theme.palette.primary.main,
      },
    },

    '&:nth-child(1)': {
      '&>div': {
        paddingLeft: 0,
      },
    },
  },
  classNameTabsWrapper: {
    display: 'block',
    width: '100%',
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(1.5),
  },
}));
