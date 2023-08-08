import { Tooltip, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { Info } from '@ankr.com/ui';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';

import { useProjectNameStyles } from './useProjectNameStyles';
import { useProjectName } from './hooks/useProjectName';

interface ProjectNameProps {
  projectName: string;
  userEndpointToken: string;
  tokenIndex: number;
}

export const ProjectName = ({
  projectName,
  userEndpointToken,
  tokenIndex,
}: ProjectNameProps) => {
  const { classes } = useProjectNameStyles();

  const { copyText, shouldShowTooltip } = useProjectName(
    userEndpointToken,
    tokenIndex,
  );

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <Typography variant="subtitle1" className={classes.name} noWrap>
          {projectName}
        </Typography>
        {shouldShowTooltip && (
          <Tooltip
            title={t('projects.list-project.project-name-tooltip')}
            placement="top"
            className={classes.tooltip}
          >
            <Info />
          </Tooltip>
        )}
      </div>
      <CopyToClipIcon
        className={classes.endpoint}
        text={userEndpointToken}
        copyText={copyText}
        message={t('common.copy-message')}
        textClassName={classes.text}
        messageClassName={classes.message}
      />
    </div>
  );
};
