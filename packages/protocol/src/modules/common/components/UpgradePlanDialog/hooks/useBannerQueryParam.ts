import { useMemo } from 'react';

import { UpgradePlanDialogType } from '../types';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';

const BANNER_KEY = 'banner';

const { Premium, Register } = UpgradePlanDialogType;

const types = [Premium, Register];

export const useBannerQueryParam = () => {
  const params = useQueryParams();

  const type = params.get(BANNER_KEY) as UpgradePlanDialogType;

  return useMemo(
    () => (type && types.includes(type) ? type : undefined),
    [type],
  );
};
