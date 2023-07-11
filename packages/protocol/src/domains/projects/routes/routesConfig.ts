import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PROJECTS_PATH = '/projects';
export const NEW_PROJECT_PATH = `${PROJECTS_PATH}/new`;

export const ProjectsRoutesConfig = createRouteConfig(
  {
    projects: {
      path: PROJECTS_PATH,
      generatePath: () => PROJECTS_PATH,
      breadcrumbs: 'projects.breadcrumbs',
    },
    newProject: {
      path: NEW_PROJECT_PATH,
      generatePath: () => NEW_PROJECT_PATH,
      breadcrumbs: 'projects.new-project.breadcrumbs',
    },
  },
  PROJECTS_PATH,
);
