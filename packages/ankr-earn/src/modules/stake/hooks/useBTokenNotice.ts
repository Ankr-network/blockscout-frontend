import { t } from '@ankr.com/common';

import { useQueryParams } from 'modules/router/hooks/useQueryParams';

interface IBTokenNoticeProps {
  bToken: string;
  cToken: string;
  nativeToken: string;
}

export const useBTokenNotice = ({
  bToken,
  cToken,
  nativeToken,
}: IBTokenNoticeProps): string | undefined => {
  return useQueryParams().get('from') === 'bond'
    ? t('stake.b-notice', {
        bToken,
        cToken,
        nativeToken,
      })
    : undefined;
};
