import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ProjectError } from 'domains/projects/components/ProjectError';

import { useNetworksSelectorTitleStyles } from './useNetworksSelectorTitleStyles';

export interface NetworksSelectorTitleProps {
  className?: string;
  hasError?: boolean;
}

export const NetworksSelectorTitle = ({
  className,
  hasError,
}: NetworksSelectorTitleProps) => {
  const { classes, cx } = useNetworksSelectorTitleStyles();

  return (
    <div className={cx(classes.root, className)}>
      <Typography className={classes.title} variant="subtitle2">
        {t('projects.networks-selector.title')}
      </Typography>
      {hasError && (
        <ProjectError>
          {t('project.configure-networks-form.error')}
        </ProjectError>
      )}
    </div>
  );
};
