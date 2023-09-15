import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';

import imgLock from './assets/lock.png';
import {
  RoutePlaceholderStylesProps,
  useRoutePlaceholderStyles,
} from './RoutePlaceholderStyles';

export interface RoutePlaceholderProps extends RoutePlaceholderStylesProps {
  breadcrumbs: string;
  title: string;
}

export const RoutePlaceholder = ({
  breadcrumbs,
  title,
  ...stylesProps
}: RoutePlaceholderProps) => {
  useSetBreadcrumbs([{ title: breadcrumbs }]);

  useRedirectToEnterpriseOnGroupChange();

  const { isOpened, onOpen, onClose } = useUpgradePlanDialog();

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
      <UpgradePlanDialog onClose={onClose} open={isOpened} />
    </div>
  );
};
