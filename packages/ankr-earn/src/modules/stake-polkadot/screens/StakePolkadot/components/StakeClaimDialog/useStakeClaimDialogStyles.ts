import { alpha, makeStyles } from '@material-ui/core';

export const useStakeClaimDialogStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    minWidth: 700,
    maxWidth: 700,
    margin: theme.spacing(0, 'auto', 0, 'auto'),
    padding: theme.spacing(7, 0, 0, 0),
  },

  item: {
    width: '100%',
    height: 'auto',
    margin: theme.spacing(0, 0, 4, 0),
    padding: theme.spacing(3.5, 3.5, 3.5, 3.5),
  },

  itemTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemBottom: {
    margin: theme.spacing(3.125, 0, 0, 0),
    borderTop: `1px solid ${alpha(theme.palette.text.secondary, 0.3)}`,

    '& label': {
      height: 18,
      margin: theme.spacing(2.7, 0, 0, 0),
    },
    '& label > span:first-child': {
      margin: theme.spacing('2px', 1, 0, 0),
    },
  },

  icon: {
    width: 44,
    minWidth: 44,
    height: 'auto',
    margin: theme.spacing(0, 2, 0, 0),
  },
  text: {
    width: '100%',
    height: 'auto',
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  actionClaimBtn: {
    width: 140,
  },

  info: {
    margin: theme.spacing(4, 0, 0, 0),
    padding: theme.spacing(0, 0, 0, 1),
    borderLeft: `2px solid ${theme.palette.primary.main}`,
  },

  valueDescription: {
    '& > div': {
      margin: theme.spacing(3.125, 0, 3.125, 0),
    },
  },

  checkboxTxt: {
    margin: theme.spacing('2px', 0, 0, 0),
    fontSize: 13,
    fontWeight: 400,
  },
}));
