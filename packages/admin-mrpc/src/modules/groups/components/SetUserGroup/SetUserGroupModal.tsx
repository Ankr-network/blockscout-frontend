import { Button, Modal } from '@mui/material';
import { useSetUserGroup } from './useSetUserGroup';
import { useSetUserGroupStyles } from './useSetUserGroupStyles';
import { SetUserGroupContent } from './SetUserGroupContent';

// component can be used on user details page
export const SetUserGroupModal = () => {
  const { classes } = useSetUserGroupStyles();
  const {
    handleSubmit,
    role,
    handleSelectRole,
    isLoading,
    handleOpen,
    open,
    handleClose,
  } = useSetUserGroup();

  return (
    <>
      <Button onClick={handleOpen} className={classes.button} sx={{ ml: 4 }}>
        Add to group
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-new-client-modal"
      >
        <div className={classes.paper}>
          <SetUserGroupContent
            handleSubmit={handleSubmit}
            role={role}
            handleSelectRole={handleSelectRole}
            isLoading={isLoading}
          />
        </div>
      </Modal>
    </>
  );
};
