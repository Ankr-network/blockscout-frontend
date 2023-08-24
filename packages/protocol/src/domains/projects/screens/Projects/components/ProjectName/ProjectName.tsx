import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';

import { useProjectNameStyles } from './useProjectNameStyles';

interface ProjectNameProps {
  projectName: string;
  userEndpointToken: string;
}

export const ProjectName = ({
  projectName,
  userEndpointToken,
}: ProjectNameProps) => {
  const { classes } = useProjectNameStyles();

  const copyText = useMemo(
    () => shrinkAddress(userEndpointToken),
    [userEndpointToken],
  );

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <Typography variant="subtitle1" className={classes.name} noWrap>
          {projectName}
        </Typography>
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
