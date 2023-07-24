import { Button } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';

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
      <UpgradePlanDialog open={isOpened} onClose={onClose} />
    </div>
  );
};
