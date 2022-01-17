import * as React from 'react';
import { Typography } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';

export const QueryEmpty = () => {
  return <Typography variant="h3">{t('common.empty')}</Typography>;
};
