import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { CHARGING_MODEL_DEAL_DOCS_LINK } from 'modules/common/constants/const';

import { useLastPackageWarningStyles } from './useLastPackageWarningStyles';

export const LastPackageWarning = () => {
  const { classes } = useLastPackageWarningStyles();

  return (
    <div className={classes.expiredNoticeWrapper}>
      <Typography
        className={classes.expiredNotice}
        variant="body3"
        component="p"
      >
        {t(`account.charging-model.package.package-notice`)}
      </Typography>

      <Button
        className={classes.btn}
        size="medium"
        href={CHARGING_MODEL_DEAL_DOCS_LINK}
        component="a"
        target="_blank"
      >
        {t(`account.charging-model.package.learn-more`)}
      </Button>
    </div>
  );
};
