import { t } from '@ankr.com/common';

import { TableVariant } from '../types';
import { getJoiner } from './getJoiner';

export interface FormatPayloadParams {
  payload: string;
  variant: TableVariant;
}

export const formatPayload = ({ payload, variant }: FormatPayloadParams) =>
  payload
    ? payload.split(',').join(getJoiner(variant))
    : t('chain-item.usage-data.last-requests.unknown');
