import { t, tHTML } from '@ankr.com/common';
import { Button } from '@mui/material';
import { useNoticeStyles } from './useNoticeStyles';
import { useDialog } from 'modules/common/hooks/useDialog';
import { intlFailedRequestsBannerRoot } from '../Tooltip';
import { PremiumChainDialog } from 'domains/chains/components/PremiumChainDialog';

export const Notice = () => {
  const { classes } = useNoticeStyles();

  const { isOpened, onOpen, onClose } = useDialog();

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
      <PremiumChainDialog open={isOpened} onClose={onClose} />
    </div>
  );
};
