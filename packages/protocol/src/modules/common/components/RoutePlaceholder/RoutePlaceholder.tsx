import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';
import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';

import imgLock from './assets/lock.png';
import {
  RoutePlaceholderStylesProps,
  useRoutePlaceholderStyles,
} from './RoutePlaceholderStyles';
import { PlansDialog } from '../PlansDialog';

export interface RoutePlaceholderProps extends RoutePlaceholderStylesProps {
  breadcrumbs: string;
  title: string;
  shouldSkipRedirect?: boolean;
}

export const RoutePlaceholder = ({
  breadcrumbs,
  shouldSkipRedirect,
  title,
  ...stylesProps
}: RoutePlaceholderProps) => {
  useSetBreadcrumbs([{ title: breadcrumbs }]);

  useRedirectToEnterpriseOnGroupChange(shouldSkipRedirect);

  const { isOpened, onClose, onOpen } = useUpgradePlanDialog();

  const { classes } = useRoutePlaceholderStyles(stylesProps);

  return (
    <div className={classes.root}>
      <div className={classes.placeholder}>
        <img className={classes.img} src={imgLock} alt="unlock" />
        <Typography variant="subtitle1" className={classes.title}>
          {title}
          <span className={classes.textPremium}>
            {t('route-placeholder.premium')}
          </span>
        </Typography>
        <Button
          size="large"
          fullWidth
          className={classes.button}
          onClick={onOpen}
        >
          {t('route-placeholder.button')}
        </Button>
      </div>
      <PlansDialog onClose={onClose} open={isOpened} />
    </div>
  );
};
