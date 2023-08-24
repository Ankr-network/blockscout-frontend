import { makeStyles } from 'tss-react/mui';

export interface PlanCardStylesParams {
  isSelected: boolean;
  disabled: boolean;
}

export const usePlanCardStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    padding: theme.spacing(4, 6, 6),

    borderRadius: 20,

    color: theme.palette.grey[900],

    cursor: 'pointer',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    fontSize: 28,
    lineHeight: '31px',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },

  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  img: {
    width: 80,
    height: 80,
  },

  price: {
    fontSize: 20,
    lineHeight: 1,
    fontWeight: 700,
    textAlign: 'right',
    maxWidth: 80,

    span: {
      span: {
        color: theme.palette.text.secondary,

        fontSize: 12,
        fontWeight: 500,
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
