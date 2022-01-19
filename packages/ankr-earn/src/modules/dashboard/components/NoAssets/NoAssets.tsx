import { t } from 'modules/i18n/utils/intl';
import { RoutesConfig } from 'modules/stake/Routes';
import { NavLink } from 'uiKit/NavLink';
import { Placeholder } from '../Placeholder';
import { useNoAssetsStyles as useStyles } from './useNoAssetsStyles';

export const NoAssets = () => {
  const classes = useStyles();

  return (
    <Placeholder
      title={t('dashboard.start-staking')}
      btnSlot={
        <NavLink
          size="medium"
          variant="contained"
          href={RoutesConfig.main.generatePath()}
          className={classes.button}
          fullWidth
        >
          {t('dashboard.stake')}
        </NavLink>
      }
    />
  );
};
