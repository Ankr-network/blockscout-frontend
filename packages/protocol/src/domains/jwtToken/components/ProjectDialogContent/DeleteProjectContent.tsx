import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { jwtTokenIntlRoot } from 'domains/jwtToken/utils/utils';
import { LoadingButton } from '@ankr.com/ui';
import { useDeleteProjectDialogStyles } from '../DeleteProjectDialog/useDeleteProjectDialogStyles';

interface IDeleteProjectDialogContentProps {
  isLoading: boolean;
  handleDelete: () => void;
  onClose: () => void;
}

export const DeleteProjectContent = ({
  isLoading,
  handleDelete,
  onClose,
}: IDeleteProjectDialogContentProps) => {
  const { classes } = useDeleteProjectDialogStyles();

  return (
    <div>
      <Typography className={classes.info} component="div">
        {t(`${jwtTokenIntlRoot}.delete-project.info`)}
      </Typography>
      <div className={classes.group}>
        <LoadingButton
          fullWidth
          size="large"
          color="error"
          onClick={handleDelete}
          loading={isLoading}
        >
          {t(`${jwtTokenIntlRoot}.delete-project.delete`)}
        </LoadingButton>
        <Button
          fullWidth
          size="large"
          variant="outlined"
          color="error"
          onClick={onClose}
        >
          {t(`${jwtTokenIntlRoot}.delete-project.cancel`)}
        </Button>
      </div>
    </div>
  );
};
