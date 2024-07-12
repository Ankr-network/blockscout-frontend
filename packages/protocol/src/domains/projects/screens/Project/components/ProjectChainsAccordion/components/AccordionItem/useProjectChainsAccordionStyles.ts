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
    display: 'flex',
    alignItems: 'center',
    width: '40%',
  },
  chainRequestsInfo: {
    width: '60%',
  },
  accordionChainLogo: {
    width: 32,
    height: 32,
    marginRight: theme.spacing(3),
  },
  accordionLabelWrapper: {},
  accordionLabel: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
  },
  chainNameWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  chainArchiveLabel: {
    marginLeft: theme.spacing(2),

    lineHeight: 1,
  },
  chainArchiveLabelText: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  accordionPremiumLabel: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  coinName: {
    display: 'flex',

    '& span': {
      fontWeight: 500,
    },
  },
  chainLabelBottom: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(0.5),
  },
  accordionDetails: {
    padding: 0,
    paddingBottom: theme.spacing(8),
  },
}));
