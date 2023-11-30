import { Typography } from '@mui/material';

import { CopyEndpointToken } from 'modules/common/components/CopyEndpointToken/CopyEndpointToken';

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

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <Typography variant="subtitle1" className={classes.name} noWrap>
          {projectName}
        </Typography>
      </div>
      <CopyEndpointToken userEndpointToken={userEndpointToken} />
    </div>
  );
};
