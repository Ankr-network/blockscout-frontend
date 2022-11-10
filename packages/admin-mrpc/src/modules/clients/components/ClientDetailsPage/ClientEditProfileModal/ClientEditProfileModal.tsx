import { Box, Button, Modal, Typography, TextField } from '@mui/material';
import { ReactComponent as IconEdit } from 'assets/img/edit.svg';
import { ClientMapped } from 'modules/clients/store/clientsSlice';
import { useClientEditProfile } from './useClientEditProfile';
import { useClientDetailsStyles as useStyles } from '../ClientDetailsStyles';

export const ClientEditProfileModal = ({
  currentClient,
}: {
  currentClient: ClientMapped;
}) => {
  const { classes } = useStyles();

  const {
    open,
    handleSubmit,
    isLoading,
    nameValue,
    onInputNameChange,
    commentValue,
    onInputCommentChange,
    handleClose,
    handleOpen,
  } = useClientEditProfile(currentClient);

  const body = (
    <div className={classes.paper}>
      <Typography variant="h6" id="manage-client-balance-modal">
        Edit client
      </Typography>

      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography sx={{ ml: 1 }} color="textSecondary" variant="caption">
          Ethereum Account
        </Typography>
        <br />
        <b>{currentClient.address}</b>
        <br />
        <br />
        <TextField
          label="Name"
          name="name"
          id="name"
          placeholder="Add Name"
          disabled={isLoading}
          value={nameValue}
          onChange={onInputNameChange}
        />
        <br />
        <br />
        <TextField
          label="Comment"
          sx={{ mt: 2, mb: 6 }}
          name="comment"
          id="comment"
          placeholder="Add Comment"
          disabled={isLoading}
          value={commentValue}
          onChange={onInputCommentChange}
        />

        <Box display="flex" justifyContent="space-between">
          <Button
            disabled={isLoading}
            type="button"
            onClick={handleClose}
            className={classes.button}
            color="secondary"
            size="large"
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            type="submit"
            className={classes.button}
            color="primary"
            size="large"
          >
            Save
          </Button>
        </Box>
      </form>
    </div>
  );

  return (
    <>
      <Button
        onClick={handleOpen}
        color="secondary"
        className={classes.balancesBtn}
        startIcon={<IconEdit />}
        sx={{ ml: 4, mr: 2 }}
      >
        Edit Client
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="manage-client-balance-modal"
      >
        {body}
      </Modal>
    </>
  );
};
