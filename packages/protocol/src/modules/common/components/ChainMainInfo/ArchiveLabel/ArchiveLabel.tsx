import React from 'react';
import { Typography } from '@material-ui/core';

import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { StatusCircle } from 'uiKit/StatusCircle';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './ArchiveLabelStyles';

interface ArchiveLabelProps {
  className?: string;
}

export const ArchiveLabel = ({ className = '' }: ArchiveLabelProps) => {
  const classes = useStyles();

  return (
    <div className={className}>
      <TooltipWrapper
        hasIcon={false}
        tooltipText={tHTML('chains.archive-tooltip-text')}
      >
        <Typography variant="body2" className={classes.label} component="div">
          <StatusCircle mr={0.4} status="success" /> {t('chains.archive')}
        </Typography>
      </TooltipWrapper>
    </div>
  );
};
