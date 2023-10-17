import { makeStyles } from 'tss-react/mui';

export const useLegendItemStyles = makeStyles<string>()((theme, dotColor) => ({
  row: {
    overflow: 'hidden',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',

    gap: theme.spacing(3),
  },
  dot: {
    flexShrink: 0,
    width: 8,
    height: 8,

    borderRadius: '50%',

    backgroundColor: dotColor,
  },
  name: {
    overflow: 'hidden',

    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

    color: theme.palette.grey[600],

    fontWeight: 500,
    fontSize: 12,
    lineHeight: 1.35,
  },
  percent: {
    justifySelf: 'flex-end',

    color: theme.palette.grey[900],

    fontWeight: 700,
    fontSize: 12,
    lineHeight: '16.2px',
  },
}));
