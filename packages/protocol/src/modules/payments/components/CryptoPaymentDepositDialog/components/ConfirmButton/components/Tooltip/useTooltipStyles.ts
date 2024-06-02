import { makeStyles } from 'tss-react/mui';

export const useTooltipStyles = makeStyles()(theme => ({
  title: {
    color: theme.palette.grey[900],
  },
}));
