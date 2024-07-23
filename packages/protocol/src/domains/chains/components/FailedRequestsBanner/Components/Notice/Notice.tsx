import { Button } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';
import { PlansDialog } from 'modules/common/components/PlansDialog';

import { intlFailedRequestsBannerRoot } from '../Tooltip';
import { useNoticeStyles } from './useNoticeStyles';

export const Notice = () => {
  const { classes } = useNoticeStyles(false);

  const { isOpened, onClose, onOpen } = useUpgradePlanDialog();

  return (
    <div className={classes.notice}>
      <div className={classes.noticeContent}>
        {tHTML(`${intlFailedRequestsBannerRoot}.notice`)}
        <Button
          fullWidth
          size="large"
          onClick={onOpen}
          className={classes.button}
        >
          {t(`${intlFailedRequestsBannerRoot}.notice-button`)}
        </Button>
      </div>
      <PlansDialog open={isOpened} onClose={onClose} />
    </div>
  );
};
