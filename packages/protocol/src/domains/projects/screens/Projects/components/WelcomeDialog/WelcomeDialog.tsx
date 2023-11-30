import { t, tHTML } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';
import { Dot } from '@ankr.com/ui';

import { NavLink } from 'uiKit/NavLink';
import { Dialog } from 'uiKit/Dialog';
import { useContactWidget } from 'hooks/useContactWidget';
import { PROJECTS_DOCS_LINK } from 'domains/projects/const';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { ProjectsWellcomeImage } from 'domains/projects/components/ProjectsWelcomeImage';

import { useWelcomeDialog } from './hooks/useWelcomeDialog';
import { useWelcomeDialogStyles } from './useWelcomeDialogStyles';

const intl = 'projects.welcome-dialog';

export const WelcomeDialog = () => {
  const { classes } = useWelcomeDialogStyles();

  const { isOpened, handleCreateNewProjectClick, handleSkipClick } =
    useWelcomeDialog();

  const { openContactWidget } = useContactWidget();

  return (
    <Dialog
      maxPxWidth={600}
      open={isOpened}
      onClose={handleSkipClick}
      paperClassName={classes.dialog}
      closeButtonClassName={classes.close}
      title={<ProjectsWellcomeImage className={classes.icon} />}
      titleClassName={classes.title}
      canCloseDialogByClickOutside={false}
    >
      <div className={classes.content}>
        <Typography variant="h6">{t(`${intl}.title`)}</Typography>
        <Typography variant="body2" className={classes.message}>
          {tHTML(`${intl}.description`)}
        </Typography>
        <NavLink href={PROJECTS_DOCS_LINK} className={classes.link}>
          <Dot size="small" />
          {t(`${intl}.how-to-get-start`)}
        </NavLink>
        <Button
          variant="text"
          onClick={openContactWidget}
          className={classes.link}
        >
          <Dot size="small" />
          {t(`${intl}.support`)}
        </Button>
        <NavLink
          className={classes.configButton}
          variant="contained"
          fullWidth
          href={ProjectsRoutesConfig.newProject.generatePath()}
          onClick={handleCreateNewProjectClick}
        >
          {t(`${intl}.create-project-button`)}
        </NavLink>
        <Button variant="outlined" fullWidth onClick={handleSkipClick}>
          {t(`${intl}.skip-button`)}
        </Button>
      </div>
    </Dialog>
  );
};
