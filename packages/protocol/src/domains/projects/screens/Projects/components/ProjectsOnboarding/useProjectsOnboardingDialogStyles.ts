import { makeStyles } from 'tss-react/mui';

import step1Bg from './assets/step-1.png';
import step2Bg from './assets/step-2.png';
import step3Bg from './assets/step-3.png';

export enum ProjectsOnboardingStep {
  'step1',
  'step2',
  'step3',
}

const bgHeight = 280;
const popupOffset = 110;

export const useProjectsOnboardingDialogStyles = makeStyles()(theme => ({
  root: {
    width: 600,
    height: 610,
    backgroundSize: `auto ${bgHeight}px`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top, center',
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  [ProjectsOnboardingStep.step1]: {
    backgroundImage: `url(${step1Bg})`,
  },
  [ProjectsOnboardingStep.step2]: {
    backgroundImage: `url(${step2Bg})`,
  },
  [ProjectsOnboardingStep.step3]: {
    backgroundImage: `url(${step3Bg})`,
  },
  stepWrapper: {
    minWidth: theme.spacing(50),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    marginTop: bgHeight - popupOffset,
    display: 'flex',
    flexDirection: 'column',

    marginLeft: theme.spacing(-10),
    marginRight: theme.spacing(-10),
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  description: {
    ul: {
      paddingLeft: theme.spacing(7),
      margin: 0,
    },
    li: {
      padding: 0,
      margin: 0,
    },
  },
  link: {
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: theme.palette.primary.main,
    padding: 0,
    fontWeight: 400,

    '&&': {
      display: 'inline-flex',
    },

    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: 'transparent',
    },
  },
  footer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 'auto',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  backButton: {
    borderRadius: theme.spacing(4),
    height: theme.spacing(10),
  },
  forwardButton: {
    borderRadius: theme.spacing(4),
    height: theme.spacing(10),
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,

    '&:hover': {
      boxShadow: `0 0 0 2px ${theme.palette.primary.dark}`,
    },
  },
}));
