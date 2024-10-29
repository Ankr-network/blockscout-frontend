import { Button, Typography } from '@mui/material';
import { Doc, Freeze, Unfreeze } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useHistory } from 'react-router';
import { useMemo } from 'react';

import { ANKR_DOCS_PROJECTS_LINK } from 'modules/common/constants/const';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { CopyEndpointToken } from 'modules/common/components/CopyEndpointToken/CopyEndpointToken';
import { DeleteProjectDialog } from 'domains/jwtToken/components/DeleteProjectDialog';
import { FreezeAndUnfreezeProjectDialog } from 'domains/jwtToken/components/FreezeAndUnfreezeProjectDialog';
import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';
import { ProjectStatusLabel } from 'domains/projects/components/ProjectStatusLabel';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { renderProjectName } from 'domains/jwtToken/utils/renderProjectName';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { useSelectedProject } from 'domains/projects/hooks/useSelectedProject';

import { PaperBlock } from '../PaperBlock';
import { ProjectDescription } from '../ProjectDescription/ProjectDescription';
import { ProjectDetailsDialog } from '../ProjectDetailsDialog';
import { ProjectDetailsMenu } from '../ProjectDetailsMenu';
import { useProjectHeaderStyles } from './useProjectHeaderStyles';
import { useProjectStatus } from '../../hooks/useProjectStatus';

interface ProjectHeaderProps {
  className?: string;
}

export const ProjectHeader = ({ className }: ProjectHeaderProps) => {
  const { classes, cx } = useProjectHeaderStyles();

  const { project } = useSelectedProject();

  const {
    isDraft,
    isLoading: isProjectStatusLoading,
    projectStatus,
  } = useProjectStatus();

  const isFrozen = projectStatus.frozen;
  const isSuspended = projectStatus.suspended;

  const {
    isOpened: isOpenedProjectInfoDialog,
    onClose: onCloseProjectInfoDialog,
    onOpen: onOpenProjectInfoDialog,
  } = useDialog();

  const {
    isOpened: isOpenedProjectDeleteDialog,
    onClose: onCloseProjectDeleteDialog,
    onOpen: onOpenProjectDeleteDialog,
  } = useDialog();

  const {
    isOpened: isFreezeAndUnfreezeProjectDialogOpened,
    onClose: onCloseFreezeAndUnfreezeProjectDialog,
    onOpen: onOpenFreezeAndUnfreezeProjectDialog,
  } = useDialog();

  const { push } = useHistory();

  const projectName = useMemo(() => {
    if (project?.name) {
      return project?.name;
    }

    return renderProjectName(project?.index);
  }, [project]);

  const hasGroupAccess = useGuardUserGroup({
    blockName: BlockWithPermission.JwtManagerWrite,
  });

  if (!project) {
    push(ProjectsRoutesConfig.projects.generatePath());

    return null;
  }

  return (
    <>
      <PaperBlock className={cx(classes.root, className)}>
        <div className={classes.mainInfo}>
          <div className={classes.projectTitleWrapper}>
            <Typography className={classes.title} variant="h6">
              {projectName}
            </Typography>
            {!isProjectStatusLoading && (
              <ProjectStatusLabel isDraft={isDraft} status={projectStatus} />
            )}
          </div>
          <CopyEndpointToken userEndpointToken={project.userEndpointToken} />
          <ProjectDescription
            projectDescriptionText={project.description}
            hasGroupAccess={hasGroupAccess}
            onOpenProjectInfoDialog={onOpenProjectInfoDialog}
          />
        </div>
        <div className={classes.actions}>
          {hasGroupAccess && !isProjectStatusLoading && (
            <Button
              className={classes.freezeButton}
              disabled={isSuspended}
              startIcon={isFrozen ? <Unfreeze /> : <Freeze />}
              variant="contained"
              onClick={onOpenFreezeAndUnfreezeProjectDialog}
            >
              {isFrozen
                ? t('projects.list-project.unfreeze')
                : t('projects.list-project.freeze')}
            </Button>
          )}
          <Button
            className={classes.docsButton}
            startIcon={<Doc />}
            href={ANKR_DOCS_PROJECTS_LINK}
            variant="outlined"
            target="_blank"
          >
            {t('project.header.docs-btn')}
          </Button>
          {hasGroupAccess && (
            <ProjectDetailsMenu
              openProjectInfoDialog={onOpenProjectInfoDialog}
              openProjectDeleteDialog={onOpenProjectDeleteDialog}
              isDeleteProjectDisabled={project.index === PRIMARY_TOKEN_INDEX}
            />
          )}
        </div>
      </PaperBlock>

      {/* DIALOGS */}
      <ProjectDetailsDialog
        isOpened={isOpenedProjectInfoDialog}
        onClose={onCloseProjectInfoDialog}
        onSuccess={onCloseProjectInfoDialog}
        projectName={projectName}
        projectDescription={project.description}
        projectIndex={project.index}
      />

      <DeleteProjectDialog
        open={isOpenedProjectDeleteDialog}
        tokenIndex={project.index}
        onSuccess={onCloseProjectDeleteDialog}
        onClose={onCloseProjectDeleteDialog}
      />

      <FreezeAndUnfreezeProjectDialog
        isFreeze={!isFrozen}
        open={isFreezeAndUnfreezeProjectDialogOpened}
        userEndpointToken={project.userEndpointToken}
        projectName={projectName}
        onClose={onCloseFreezeAndUnfreezeProjectDialog}
      />
    </>
  );
};
