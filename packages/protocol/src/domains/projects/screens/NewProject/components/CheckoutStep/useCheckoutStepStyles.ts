import { makeStyles } from 'tss-react/mui';

export const useCheckoutStepStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: theme.spacing(7.5),

    marginTop: theme.spacing(6),
  },
  left: {
    flexGrow: 1,

    paddingTop: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(3),

    letterSpacing: '-0.02em',

    lineHeight: '135%',
  },
  description: {
    display: 'inline-flex',

    maxWidth: 480,
    marginBottom: theme.spacing(6),

    letterSpacing: '-0.01em',

    lineHeight: '140%',
  },
  chainsSection: {
    marginBottom: theme.spacing(3),
  },
  right: {
    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'space-between',
  },
  link: {
    width: '100%',
  },
  currentPlanSection: {
    width: 294,
    minHeight: 234,
  },
  currentPlanSectionTitle: {
    marginBottom: theme.spacing(4),
  },
  section: {
    position: 'relative',

    width: '100%',
    minHeight: 111,
    padding: theme.spacing(5.75),

    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '17px',
  },
  sectionTitle: {
    marginBottom: theme.spacing(3),

    lineHeight: '135%',
    fontSize: 14,
  },
  editButton: {
    position: 'absolute',
    top: theme.spacing(4),
    right: theme.spacing(5.5),

    minHeight: 32,
    height: 32,
    padding: theme.spacing(1.5, 3, 1.5, 2),

    color: theme.palette.text.secondary,

    fontSize: 14,
    fontWeight: 500,
    lineHeight: '143%',
  },
  chainsListWrapper: {
    overflow: 'hidden',
  },
  whitelistBadge: {
    borderRadius: 8,
    backgroundColor: theme.palette.background.default,
    width: 'fit-content',
    padding: theme.spacing(0.5, 2),
  },
  whitelistBadgeText: {
    fontSize: 14,
    lineHeight: '140%',
  },
}));
