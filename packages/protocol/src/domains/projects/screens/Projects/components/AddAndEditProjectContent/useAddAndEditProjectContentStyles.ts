import { makeStyles } from 'tss-react/mui';

export const useAddAndEditProjectContentStyles = makeStyles()(theme => ({
  description: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(8),
    lineHeight: '22.4px',
  },
}));
