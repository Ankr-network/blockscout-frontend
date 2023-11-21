import { t } from '@ankr.com/common';
import { Button } from '@mui/material';
import { useHistory } from 'react-router';
import { useCallback } from 'react';

import { ProjectChainsContext } from 'domains/projects/screens/Project/constants';
import { useProjectChains } from 'domains/projects/screens/Project/hooks/useProjectChains';
import { useRedirectToProjectsListPageOnGroupChange } from 'domains/projects/screens/Project/hooks/useRedirectToProjectsListPageOnGroupChange';
import { AccountRoutesConfig } from 'domains/account/Routes';

import { ProjectChains } from '../ProjectChains';
import { ProjectFooter } from '../ProjectFooter';
import { ProjectHeader } from '../ProjectHeader';
import { Requests } from '../Requests';
import { Whitelist } from '../Whitelist';
import { useProjectStyles } from './useProjectStyles';
import { useProjectStatus } from '../../hooks/useProjectStatus';
import { ProjectBanner } from '../ProjectBanner';
import { useProjectStatsInitialization } from '../../hooks/useProjectStatsInitialization';

export const Project = () => {
  const { classes } = useProjectStyles();
  const { push } = useHistory();

  useRedirectToProjectsListPageOnGroupChange();

  useProjectStatsInitialization();

  const projectChainsData = useProjectChains();

  const {
    projectStatus: { frozen: isFrozen, suspended: isSuspended },
  } = useProjectStatus();

  const redirectToBalance = useCallback(() => {
    push(AccountRoutesConfig.accountDetails.generatePath());
  }, [push]);

  return (
    <ProjectChainsContext.Provider value={projectChainsData}>
      <div className={classes.root}>
        {isFrozen && !isSuspended && (
          <ProjectBanner
            className={classes.banner}
            message={t('project.banner.frozen')}
          />
        )}
        {isSuspended && (
          <ProjectBanner
            className={classes.banner}
            message={t('project.banner.suspended')}
            button={
              <Button
                className={classes.bannerButton}
                size="small"
                onClick={redirectToBalance}
              >
                {t('project.banner.suspended-button')}
              </Button>
            }
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
