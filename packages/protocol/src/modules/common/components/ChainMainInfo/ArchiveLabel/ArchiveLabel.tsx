import React from 'react';
import { Typography } from '@material-ui/core';

import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { StatusCircle } from 'uiKit/StatusCircle';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './ArchiveLabelStyles';
import classNames from 'classnames';

export interface ArchiveLabelProps {
  className?: string;
  labelClassName?: string;
}

export const ArchiveLabel = ({
  className = '',
  labelClassName,
}: ArchiveLabelProps) => {
  const classes = useStyles();

  return (
    <div className={className}>
      <TooltipWrapper
        hasIcon={false}
        tooltipText={tHTML('chains.archive-tooltip-text')}
      >
        <Typography
          className={classNames(labelClassName, classes.label)}
          component="div"
          variant="body2"
        >
          <StatusCircle mr={0.4} status="success" /> {t('chains.archive')}
        </Typography>
      </TooltipWrapper>
    </div>
  );
};
