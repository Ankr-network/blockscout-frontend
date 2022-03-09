import { makeStyles } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';

export const useNoCrowdloanStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 720,
    padding: theme.spacing(5, 3),
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
    borderRadius: 24,

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 18, 6, 18),
    },
  },

  cardLogo: {
    fontSize: 100,
  },
  cardMessage: {
    padding: '37px 0 21px 0',
    fontWeight: 500,
    textAlign: 'center',
    lineHeight: '140%',
  },
  cardSubMessage: {
    fontWeight: 400,
  },
}));
