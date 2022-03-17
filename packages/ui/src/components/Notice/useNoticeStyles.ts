import { makeStyles } from '@material-ui/core/styles';

export const useNoticeStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    paddingLeft: theme.spacing(1.5),
    '&::before': {
      content: "''",
      display: 'block',
      borderRadius: 2,
      position: 'absolute',
      left: 0,
      background: theme.palette.primary.main,
      width: 4,
      height: '100%',
      margin: 'auto',
      top: 0,
      bottom: 0,
    },
  },
}));
