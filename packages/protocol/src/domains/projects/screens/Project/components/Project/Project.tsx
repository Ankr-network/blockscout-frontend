import { t } from '@ankr.com/common';

import { ProjectChainsContext } from 'domains/projects/screens/Project/constants';
import { useProjectChains } from 'domains/projects/screens/Project/hooks/useProjectChains';
import { useRedirectToProjectsListPageOnGroupChange } from 'domains/projects/screens/Project/hooks/useRedirectToProjectsListPageOnGroupChange';

import { ProjectChains } from '../ProjectChains';
import { ProjectFooter } from '../ProjectFooter';
import { ProjectHeader } from '../ProjectHeader';
import { Requests } from '../Requests';
import { Whitelist } from '../Whitelist';
import { useProjectStyles } from './useProjectStyles';
import { useProjectStatus } from '../../hooks/useProjectStatus';
import { ProjectBanner } from '../../../../components/ProjectBanner';
import { useProjectStatsInitialization } from '../../hooks/useProjectStatsInitialization';

export const Project = () => {
  const { classes } = useProjectStyles();

  useRedirectToProjectsListPageOnGroupChange();

  useProjectStatsInitialization();

  const projectChainsData = useProjectChains();

  const {
    projectStatus: { frozen: isFrozen, suspended: isSuspended },
  } = useProjectStatus();

  return (
    <ProjectChainsContext.Provider value={projectChainsData}>
      <div className={classes.root}>
        {isFrozen && !isSuspended && (
          <ProjectBanner
            className={classes.banner}
            message={t('project.banner.frozen')}
          />
        )}
        <ProjectHeader className={classes.header} />
        <Requests className={classes.requests} />
        <Whitelist className={classes.whitelist} />
        <ProjectChains className={classes.endpoints} />
        <ProjectFooter className={classes.footer} />
      </div>
    </ProjectChainsContext.Provider>
  );
};
