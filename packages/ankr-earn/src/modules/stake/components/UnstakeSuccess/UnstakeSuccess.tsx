import { Paper, Typography } from '@material-ui/core';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { NavLink } from 'uiKit/NavLink';
import { useUnstakeSuccessStyles } from './useUnstakeSuccessStyles';

interface IUnstakeSuccessProps {
  onClose?: () => void;
  tokenName: string;
  period?: string;
}

export const UnstakeSuccess = ({
  onClose,
  tokenName,
  period,
}: IUnstakeSuccessProps) => {
  const classes = useUnstakeSuccessStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h1" component="h2" className={classes.title}>
        {t('unstake-dialog.success.title')}
      </Typography>

      <Typography className={classes.text}>
        {t('unstake-dialog.success.description', {
          token: tokenName,
          period,
        })}
      </Typography>

      <NavLink
        variant="contained"
        href={DashboardRoutes.dashboard.generatePath()}
        className={classes.btn}
        size="large"
        fullWidth
      >
        {t('unstake-dialog.success.return')}
      </NavLink>

      <Button variant="outlined" className={classes.closeBtn} onClick={onClose}>
        <CloseIcon size="xxs" htmlColor="inherit" />
      </Button>
    </Paper>
  );
};
