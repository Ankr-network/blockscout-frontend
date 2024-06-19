import { Button } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';

import { useNoticeStyles } from './useNoticeStyles';

export const Notice = () => {
  const { classes } = useNoticeStyles(true);

  const { isOpened, onClose, onOpen } = useUpgradePlanDialog();

  return (
    <div className={classes.notice}>
      <div className={classes.noticeContent}>
        {tHTML(`requests-banner.notice`)}
        <Button
          fullWidth
          size="large"
          onClick={onOpen}
          className={classes.button}
        >
          {t(`requests-banner.notice-button`)}
        </Button>
      </div>
      <UpgradePlanDialog open={isOpened} onClose={onClose} />
    </div>
  );
};
