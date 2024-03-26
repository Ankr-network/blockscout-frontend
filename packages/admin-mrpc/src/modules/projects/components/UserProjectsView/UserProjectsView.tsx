import { Box, Button, Modal, Typography } from '@mui/material';
import { UserProject, Web3Address } from 'multirpc-sdk';
import { OverlaySpinner as Spinner } from '@ankr.com/ui';

import { t } from 'modules/i18n/utils/intl';

import { AllowedUserProjectsModal } from '../AllowedUserProjectsModal';
import { useProjectsView } from './hooks/useProjectsView';
import { UserProjectItem } from './UserProjectItem';
import { useUserProjectsViewStyles } from './UserProjectsViewStyles';

interface UserProjectsViewProps {
  address: Web3Address;
  userProjectsData?: UserProject[] | null;
  isLoadingUserProjects: boolean;
}

export const UserProjectsView = ({
  address,
  userProjectsData,
  isLoadingUserProjects,
}: UserProjectsViewProps) => {
  const { classes } = useUserProjectsViewStyles();

  const {
    onDeleteUserProject,
    isLoadingDeleteUser,
    handleOpen,
    open,
    handleClose,
    onInputJwtLimitChange,
    jwtLimit,
    isLoadingJwtLimit,
    handleSetJwtLimit,
  } = useProjectsView(address);

  return (
    <>
      <Box className={classes.projectsRoot}>
        <div className={classes.projectsTitleWrapper}>
          <Typography className={classes.projectsTitle} variant="subtitle1">
            {t('projects.view.title')}
          </Typography>
          <Button
            onClick={handleOpen}
            disabled={isLoadingDeleteUser}
            variant="outlined"
          >
            {t('projects.view.modal-button')}
          </Button>
        </div>
        {isLoadingUserProjects ? (
          <Spinner size={40} />
        ) : (
          <div className={classes.projectsList}>
            {userProjectsData?.map(project => (
              <UserProjectItem
                key={project.id}
                onDeleteUserProject={onDeleteUserProject}
                isLoadingDeleteUser={isLoadingDeleteUser}
                {...project}
              />
            ))}
          </div>
        )}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="manage-client-balance-modal"
      >
        <AllowedUserProjectsModal
          onInputJwtLimitChange={onInputJwtLimitChange}
          jwtLimit={jwtLimit}
          isLoading={isLoadingJwtLimit}
          onSetJwtLimit={handleSetJwtLimit}
        />
      </Modal>
    </>
  );
};
