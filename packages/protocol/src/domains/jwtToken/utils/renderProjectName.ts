import { t } from '@ankr.com/common';

import { jwtTokenIntlRoot, PRIMARY_TOKEN_INDEX } from './utils';

export const renderProjectName = (index?: number) => {
  return index === PRIMARY_TOKEN_INDEX
    ? t(`${jwtTokenIntlRoot}.default-project-name`)
    : t(`${jwtTokenIntlRoot}.additional`, { index });
};
