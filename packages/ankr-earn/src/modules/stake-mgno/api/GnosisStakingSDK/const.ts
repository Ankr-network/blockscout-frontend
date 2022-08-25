import { AvailableReadProviders } from '@ankr.com/provider';

import { isMainnet } from 'modules/common/const';

export const GNOSIS_PROVIDER_READ_ID = isMainnet
  ? AvailableReadProviders.gnosis
  : AvailableReadProviders.sokol;
