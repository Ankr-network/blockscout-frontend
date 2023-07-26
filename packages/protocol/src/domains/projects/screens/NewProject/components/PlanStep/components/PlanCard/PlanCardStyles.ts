import { makeStyles } from 'tss-react/mui';

export interface PlanCardStylesParams {
  isSelected: boolean;
  disabled: boolean;
}

export const usePlanCardStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),

    width: '100%',
    padding: theme.spacing(6),

    borderRadius: 20,

    color: theme.palette.grey[900],

    cursor: 'pointer',

    fontWeight: 700,
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    letterSpacing: '-0.03em',

    fontSize: 28,
    lineHeight: '31px',
  },
  price: {
    letterSpacing: '-0.02em',

    fontSize: 20,
    lineHeight: '27px',

    span: {
      span: {
        color: theme.palette.grey[600],

        letterSpacing: '-0.01em',

        fontSize: 16,
        lineHeight: '22px',
      },
    },
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(),

    color: theme.palette.grey[900],

    letterSpacing: '-0.01em',

    fontWeight: 700,
    fontSize: 16,
    lineHeight: '22px',

    span: {
      span: {
        fontWeight: 400,
      },
    },
  },
  disabled: {
    cursor: 'default',
    background: theme.palette.background.default,
  },
  selected: {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  radio: {
    position: 'relative',
    top: 3,
    marginLeft: theme.spacing(1),

    '& svg': {
      width: 24,
    },
  },
}));
