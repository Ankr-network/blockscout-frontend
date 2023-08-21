import { t, tHTML } from '@ankr.com/common';

import { RoutePlaceholder } from 'modules/common/components/RoutePlaceholder';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';

import bgLg from './assets/bg-lg.png';
import bgLgDark from './assets/bg-lg-dark.png';
import bgSm from './assets/bg-sm.png';
import bgSmDark from './assets/bg-sm-dark.png';

export const ProjectsPlaceholder = () => (
  <RoutePlaceholder
    bgLg={bgLg}
    bgLgDark={bgLgDark}
    bgSm={bgSm}
    bgSmDark={bgSmDark}
    breadcrumbs={t(ProjectsRoutesConfig.projects.breadcrumbs)}
    title={tHTML('projects.placeholder.title')}
  />
);
