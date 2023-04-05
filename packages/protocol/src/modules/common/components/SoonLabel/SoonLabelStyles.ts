import { makeStyles } from 'tss-react/mui';

export const useSoonLabelStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(0.5, 2),

    borderRadius: 8,

    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[600],

    fontWeight: 400,
    fontSize: '14px !important',
    lineHeight: '20px',
  },
}));