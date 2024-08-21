import { makeStyles } from 'tss-react/mui';
import { accordionSummaryClasses } from '@mui/material';

export const useProjectChainsAccordionStyles = makeStyles()(theme => ({
  accordionRoot: {
    paddingTop: theme.spacing(0.5),
    background: 'none',
  },
  accordionRootActive: {
    '&&': {
      margin: 0,
    },
  },
  accordionSummaryWrapper: {
    backgroundColor: theme.palette.background.paper,
    padding: 0,
    borderBottom: `1px solid ${theme.palette.divider}`,
    minHeight: 70,

    [`&.${accordionSummaryClasses.expanded}`]: {
      [`& > .${accordionSummaryClasses.content}`]: {
        margin: '14px 0',
      },
    },
  },
  accordionSummaryWrapperActive: {
    borderBottom: `none`,
  },
  accordionSummary: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  chainDescription: {
    width: '40%',
  },
  chainRequestsInfo: {
    width: '60%',
  },
  accordionDetails: {
    padding: 0,
    paddingBottom: theme.spacing(8),
  },
}));
