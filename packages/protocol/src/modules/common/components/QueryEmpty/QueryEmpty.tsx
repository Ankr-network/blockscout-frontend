import * as React from 'react';
import { Typography } from '@mui/material';

import { t } from '@ankr.com/common';

export const QueryEmpty = () => {
  return (
    <Typography variant="h3" style={{ fontSize: 30 }}>
      {t('common.empty')}
    </Typography>
  );
};
