import { makeStyles } from '@material-ui/core/styles';

export const useMyRewardsClaimModalStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  containerArea: {
    position: 'relative',
    width: 600,
    height: 'auto',
    margin: theme.spacing(11.25, 'auto', 11.25, 'auto'),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 18,
  },
  closeArea: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  bodyArea: {
    margin: theme.spacing(8.75, 6.25, 6.25, 6.25),
  },

  closeBtn: {
    border: 'none',

    '& a:hover': {
      backgroundColor: 'inherit',
    },
  },
}));
