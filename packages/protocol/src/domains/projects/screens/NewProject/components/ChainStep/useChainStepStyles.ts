import { makeStyles } from 'tss-react/mui';

export const useChainStepStyles = makeStyles()(theme => ({
  chainsRoot: {
    marginTop: theme.spacing(10),
  },
  chainsHeader: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  chainTitleWrapper: {
    marginBottom: theme.spacing(4),
    maxWidth: 460,
    paddingRight: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  description: {
    color: theme.palette.text.secondary,
  },
  search: {
    backgroundColor: theme.palette.background.default,
  },
  dialogPaper: {
    width: 600,
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',

    marginBottom: theme.spacing(3),
    paddingRight: theme.spacing(15),

    letterSpacing: '-0.03em',

    fontSize: 28,
    lineHeight: '110%',
  },
  chainItemWrapper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4, 5),
    marginBottom: theme.spacing(8),
  },
  chainItem: {
    display: 'flex',
    alignItems: 'center',
  },
  chainSelectListWrapper: {
    marginBottom: theme.spacing(4),
  },
  modalBtn: {
    marginTop: theme.spacing(3),
  },
  chainModalDescription: {
    marginBottom: theme.spacing(5),

    color: theme.palette.text.secondary,
    letterSpacing: '-0.01em',

    fontSize: 16,
    lineHeight: '140%',
  },
  selectedChainLabel: {
    marginBottom: theme.spacing(),

    color: theme.palette.text.secondary,

    fontSize: 14,
    fontWeight: 700,
    lineHeight: '135%',
  },
}));
