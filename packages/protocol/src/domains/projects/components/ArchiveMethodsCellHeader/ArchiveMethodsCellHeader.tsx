import { Tooltip } from '@mui/material';
import { Info } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useArchiveMethodsCellStyles } from './useArchiveMethodsCellHeaderStyles';

export const ArchiveMethodsCellHeader = () => {
  const { classes } = useArchiveMethodsCellStyles();

  return (
    <div className={classes.root}>
      {t('projects.chains-table.archive-methods.header')}
      <Tooltip
        placement="top"
        title={t('projects.chains-table.archive-methods.tooltip')}
      >
        <Info className={classes.tooltipIcon} />
      </Tooltip>
    </div>
  );
};
