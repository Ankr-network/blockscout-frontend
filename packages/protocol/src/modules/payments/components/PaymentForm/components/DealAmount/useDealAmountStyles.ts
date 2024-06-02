import { makeStyles } from 'tss-react/mui';

const MARKER_SIZE = 8;

export const useDealAmountStyles = makeStyles()(theme => ({
  dealAmountRoot: {
    padding: theme.spacing(5),
    borderRadius: theme.spacing(5),
    border: `2px solid ${theme.palette.primary.main}`,
    marginBottom: theme.spacing(5),
  },
  dealAmountHeader: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: theme.palette.background.default,
    marginRight: theme.spacing(2),
    position: 'relative',

    '&:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      borderRadius: '50%',
      width: MARKER_SIZE,
      height: MARKER_SIZE,
      marginTop: -(MARKER_SIZE / 2),
      marginLeft: -(MARKER_SIZE / 2),
      backgroundColor: theme.palette.grey[500],
    },
  },
  dealAmountTitle: {
    position: 'relative',
  },
  labelWrapper: {
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  amount: {
    marginLeft: 'auto',

    color: theme.palette.grey[900],

    'span span': {
      fontSize: 12,
      fontWeight: 500,
      color: theme.palette.text.secondary,
    },
  },
  dealAmountList: {
    paddingLeft: theme.spacing(6),
    marginBottom: 0,
    marginTop: theme.spacing(2),
  },
  dealAmountListItem: {
    color: theme.palette.text.secondary,
    lineHeight: '16px',
  },
  listItemText: {
    fontWeight: 500,
  },
}));
