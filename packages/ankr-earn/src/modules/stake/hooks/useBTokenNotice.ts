import { t } from '@ankr.com/common';

import { Token } from 'modules/common/types/token';

import { useQueryParams } from '../../router/hooks/useQueryParams';

interface IBTokenNoticeProps {
  bToken: Token;
  cToken: Token;
  nativeToken: Token;
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
