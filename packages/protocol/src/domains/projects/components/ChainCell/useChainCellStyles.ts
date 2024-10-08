import { makeStyles } from 'tss-react/mui';
import { accordionClasses } from '@mui/material';

const name = 'ChainCell';

export const useChainCellStyles = makeStyles({ name })(theme => ({
  chainCellroot: {
    display: 'flex',
    alignItems: 'center',

    cursor: 'pointer',
  },
  chainAccordion: {
    width: '100%',
    backgroundImage: 'none',
  },
  chainAccordionSummary: {
    paddingLeft: 0,
    paddingRight: 0,
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      margin: 0,

      [`&.${accordionClasses.expanded}`]: {
        margin: 0,
      },
    },
    [`&.${accordionClasses.expanded}`]: {
      minHeight: 48,
    },
  },
  chainCellAccordionDetails: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },
  checkbox: {
    marginRight: theme.spacing(2),
    input: {
      width: '60px',
      height: '80px',
      left: '-28px',
      top: '-28px',
    },
  },
}));
