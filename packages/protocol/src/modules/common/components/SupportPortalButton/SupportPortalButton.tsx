import { Button } from '@mui/material';
import { useRouteMatch } from 'react-router';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { SUPPORT_PORTAL_LINK } from 'modules/common/constants/const';

import { useSupportPortalButtonStyles } from './useSupportPortalButtonStyles';

export const SupportPortalButton = () => {
  const isNewProjectPage = Boolean(
    useRouteMatch(ProjectsRoutesConfig.newProject.path),
  );

  const { classes } = useSupportPortalButtonStyles({ isNewProjectPage });

  return (
    <Button
      classes={classes}
      href={SUPPORT_PORTAL_LINK}
      variant="contained"
      target="_blank"
    >
      ?
    </Button>
  );
};
