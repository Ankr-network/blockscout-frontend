import { Box, Button } from '@mui/material';
import { t } from '@ankr.com/common';
import { Plus } from '@ankr.com/ui';

import image from './assets/business.png';
import { useBusinessSettingsStyles } from './useBusinessSettingsStyles';
import { useDialog } from 'modules/common/hooks/useDialog';
import { CreateBusinessAccountDialog } from './components/CreateBusinessAccountDialog';
import { InviteUser } from './components/InviteUser';

interface BusinessSettingsProps {
  isUserBusinessOwner?: boolean;
  hasPremium?: boolean;
}

export const BusinessSettings = ({
  isUserBusinessOwner,
  hasPremium,
}: BusinessSettingsProps) => {
  const { classes } = useBusinessSettingsStyles();
  const { isOpened, onOpen, onClose } = useDialog();

  return (
    <>
      {isUserBusinessOwner ? (
        <InviteUser />
      ) : (
        <Box className={classes.root}>
          <img alt="business" className={classes.image} src={image} />
          <div className={classes.title}>
            {t('user-settings.business-settings.title')}
          </div>
          <div className={classes.description}>
            {t('user-settings.business-settings.description')}
          </div>
          <Button
            className={classes.button}
            startIcon={<Plus />}
            variant="contained"
            onClick={onOpen}
            disabled={!hasPremium}
            classes={{
              startIcon: classes.startIcon,
            }}
          >
            {t('user-settings.business-settings.button')}
          </Button>
          <CreateBusinessAccountDialog isOpened={isOpened} onClose={onClose} />
        </Box>
      )}
    </>
  );
};
