import { Theme } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const useNoCrowdloanStyles = makeStyles<Theme>((theme: Theme) => ({
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
    padding: theme.spacing(6, 18, 6, 18),
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
    borderRadius: 24,
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
