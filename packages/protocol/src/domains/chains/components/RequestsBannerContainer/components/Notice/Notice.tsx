import { t, tHTML } from '@ankr.com/common';
import { Button } from '@mui/material';
import { useDialog } from 'modules/common/hooks/useDialog';
import { PremiumChainDialog } from 'domains/chains/components/PremiumChainDialog';
import { useNoticeStyles } from '../../../FailedRequestsBanner/Components/Notice/useNoticeStyles';

export const Notice = () => {
  const { classes } = useNoticeStyles(true);

  const { isOpened, onOpen, onClose } = useDialog();

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
      <PremiumChainDialog open={isOpened} onClose={onClose} />
    </div>
  );
};
