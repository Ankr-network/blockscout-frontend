import { makeStyles } from 'tss-react/mui';

export const useFAQStyles = makeStyles()(theme => ({
  component: {
    marginTop: theme.spacing(10),
  },
  title: {
    fontSize: 28,
    lineHeight: '30px',
    letterSpacing: '-0.03em',
    color: '#1F2226',
    marginBottom: theme.spacing(5),
  },
  faqsWrapper: {
    display: 'grid',
    gap: `${theme.spacing(3.5)}`,
    width: '100%',
    padding: theme.spacing(5),
    borderRadius: 32,
    overflow: 'hidden',
    background: '#FFFFFF',
  },
  faqSectionWrapper: {
    display: 'grid',
  },
  faqSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: `${theme.spacing(7.5)}`,

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gap: 'unset',
    },
  },
  column: {
    display: 'grid',
    alignContent: 'start',
  },
  faqTitle: {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '135%',
    letterSpacing: '-0.02em',
    fontFeatureSettings: "'case' on, 'cv11' on, 'calt' off",
    color: '#1F2226',
  },
  action: {
    borderRadius: '12px',
    background: '#E1E9FD',
    width: '100%',
    height: 48,
    color: '#356DF3',
    marginTop: theme.spacing(2.75),

    '&:hover': {
      color: '#356DF3',
      background: '#d1d8e8',
    },
  },
}));
