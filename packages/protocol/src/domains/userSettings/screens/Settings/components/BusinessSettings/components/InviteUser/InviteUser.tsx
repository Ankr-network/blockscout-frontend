import { Box, Button } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { Plus } from '@ankr.com/ui';

import { useDialog } from 'modules/common/hooks/useDialog';

import { useInviteUserStyles } from './useInviteUserStyles';
import { InviteUserDialog } from '../InviteUserDialog';
import image from './assets/users.png';

export const InviteUser = () => {
  const { classes } = useInviteUserStyles();
  const { isOpened, onOpen, onClose } = useDialog();

  return (
    <>
      <Box className={classes.root}>
        <img alt="users" className={classes.image} src={image} />
        <div className={classes.title}>
          {t('user-settings.business-settings.invite-users.title')}
        </div>
        <div className={classes.description}>
          {tHTML('user-settings.business-settings.invite-users.description')}
        </div>
        <Button
          className={classes.button}
          variant="contained"
          onClick={onOpen}
          startIcon={<Plus />}
          classes={{
            startIcon: classes.startIcon,
          }}
        >
          {t('user-settings.business-settings.invite-users.button')}
        </Button>
      </Box>
      <InviteUserDialog isOpened={isOpened} onClose={onClose} />
    </>
  );
};
