import { makeStyles } from 'tss-react/mui';
import { accordionSummaryClasses, accordionClasses } from '@mui/material';

const checkboxInputWithExtendedClickArea = {
  width: '60px',
  height: '56px',
  left: '-28px',
  top: '-18px',
};

export const useChainProjectAccordionStyles = makeStyles({
  name: 'ChainProjectAccordion',
})(theme => ({
  singleProjectItem: {
    height: 56,
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    input: checkboxInputWithExtendedClickArea,
  },
  projectItemWrapper: {
    maxWidth: '100%',

    input: checkboxInputWithExtendedClickArea,
  },
  projectLabel: {
    fontWeight: 700,
  },

  chainProjectAccordion: {
    backgroundImage: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,

    [`&.${accordionClasses.root}`]: {
      margin: 0,
    },

    [`&.${accordionSummaryClasses.expanded}`]: {
      '&:before': {
        opacity: 1,
      },
    },
  },
  chainProjectAccordionSummary: {
    height: 56,
    padding: 0,

    [`&.${accordionSummaryClasses.expanded}`]: {
      height: 56,
      minHeight: 56,
    },
    [`& > .${accordionSummaryClasses.content}`]: {
      margin: 0,
    },
  },
  chainProjectCellAccordionDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: 0,
    paddingBottom: theme.spacing(7),
  },
}));
