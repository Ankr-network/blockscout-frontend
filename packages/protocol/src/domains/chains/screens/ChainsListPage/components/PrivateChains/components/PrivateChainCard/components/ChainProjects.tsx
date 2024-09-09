import { Skeleton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { MappedWhitelistBlockchainsResponse } from 'domains/projects/actions/fetchWhitelistsBlockchains';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { usePrivateChainsItemStyles } from '../usePrivateChainsItemStyles';
import { chainProjectsTranslation } from './translation';

export interface ChainProjectsProps {
  isLoadingProjects: boolean;
  chainProjects?: MappedWhitelistBlockchainsResponse[];
}

const MAX_VISIBLE_PROJECTS = 2;

export const ChainProjects = ({
  chainProjects,
  isLoadingProjects,
}: ChainProjectsProps) => {
  const { classes } = usePrivateChainsItemStyles();

  const { keys, t } = useTranslation(chainProjectsTranslation);

  const shouldShowSkeleton = isLoadingProjects && !chainProjects;

  const renderProjectNames = useCallback(
    (projects: MappedWhitelistBlockchainsResponse[]) => {
      return projects.map(({ projectName, userEndpointToken }) => {
        return (
          <Link
            key={userEndpointToken}
            title={projectName}
            className={classes.projectLink}
            onClick={e => e.stopPropagation()}
            to={ProjectsRoutesConfig.project.generatePath(userEndpointToken)}
          >
            <span className={classes.projectLinkName}>{projectName}</span>
          </Link>
        );
      });
    },
    [classes.projectLink, classes.projectLinkName],
  );

  const renderProjects = useMemo(() => {
    if (!chainProjects?.length) {
      return (
        <Typography
          className={classes.notAddedText}
          color="textSecondary"
          variant="body3"
        >
          {t(keys.notAdded)}
        </Typography>
      );
    }

    if (chainProjects.length <= MAX_VISIBLE_PROJECTS) {
      return renderProjectNames(chainProjects);
    }

    if (chainProjects.length > MAX_VISIBLE_PROJECTS) {
      const visibleProjects = chainProjects.slice(0, MAX_VISIBLE_PROJECTS);
      const hiddenProjectsCount = chainProjects.length - MAX_VISIBLE_PROJECTS;

      return (
        <>
          {renderProjectNames(visibleProjects)}
          <Typography color="textSecondary" variant="body3">
            +{hiddenProjectsCount}
          </Typography>
        </>
      );
    }

    return (
      <Typography
        className={classes.notAddedText}
        color="textSecondary"
        variant="body3"
      >
        {t(keys.notAdded)}
      </Typography>
    );
  }, [
    chainProjects,
    classes.notAddedText,
    keys.notAdded,
    renderProjectNames,
    t,
  ]);

  return (
    <div className={classes.chainProjects}>
      {shouldShowSkeleton ? (
        <Skeleton variant="text" width={145} height={30} />
      ) : (
        renderProjects
      )}
    </div>
  );
};
