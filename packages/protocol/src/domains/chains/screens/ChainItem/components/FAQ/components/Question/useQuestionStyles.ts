import { makeStyles } from 'tss-react/mui';

export const useQuestionStyles = makeStyles()(theme => ({
  questionItemWrapper: {
    display: 'grid',
    overflow: 'hidden',
    transition: '0.3s ease all',

    [theme.breakpoints.down('sm')]: {
      '&:not(:last-child)': {
        borderBottom: '2px solid #F2F5FA',
      },
    },
  },
  underlined: {
    borderBottom: '2px solid #F2F5FA',
  },
  header: {
    display: 'flex',
    gap: `${theme.spacing(1.5)}`,
    alignItems: 'center',
    cursor: 'pointer',
    height: 'auto',
    padding: theme.spacing(4, 0),
  },
  iconWrapper: {
    width: 24,
    height: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: `$rotate 0.4s ease`,
    animationFillMode: 'forwards',
  },
  questionTitle: {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '140%',
    letterSpacing: '-0.01em',
    fontFeatureSettings: "'case' on, 'cv11' on, 'calt' off",
    color: '#1F2226',
    transition: '0.3s ease all',

    '&:hover': {
      color: '#356DF3',
    },
  },
  questionTitleActive: {
    color: '#356DF3',
  },
  content: {
    overflow: 'hidden',
    display: 'grid',
    marginLeft: theme.spacing(7.5),

    '& div ul, & div ol': {
      display: 'grid',
      gap: `${theme.spacing(1.5)}`,
      margin: 0,
      padding: theme.spacing(0, 0, 0, 4.25),
    },

    '& div ul': {
      listStyle: 'disc',
    },

    '& div ol': {
      listStyle: 'auto',
    },

    '& div code': {
      letterSpacing: '-0.03em',
    },

    '& div > span': {
      margin: 0,
      padding: 0,
    },

    '& a': {
      color: '#356DF3',
    },

    '& h4': {
      margin: theme.spacing(1, 0, 0.5),
      fontSize: 19,
    },

    '& table': {
      width: '100%',

      '& td, & th': {
        textAlign: 'left',
      },

      '& td:not(:first-child), & th:not(:first-child)': {
        textAlign: 'right',
      },
    },

    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(6),
    },
  },
  questionText: {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '140%',
    letterSpacing: '-0.01em',
    fontFeatureSettings: "'case' on, 'cv11' on, 'calt' off",
    color: '#2E343C',
    marginBottom: theme.spacing(4),
  },
  '@keyframes rotate': {
    '0%': {
      transform: 'rotate(180deg)',
    },
    '100%': {
      transform: 'rotate(0deg)',
    },
  },
}));
