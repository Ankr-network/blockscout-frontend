import { Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { formatTimestamp } from './utils/formatTimestamp';
import { timestampTranslation } from './translation';

export interface ITimestampProps {
  timestamp: number;
}

export const Timestamp = ({ timestamp }: ITimestampProps) => {
  const { keys, t } = useTranslation(timestampTranslation);

  const todayPrefix = t(keys.today);
  const yesterdayPrefix = t(keys.yesterday);

  return (
    <Typography color="textSecondary" variant="body3">
      {formatTimestamp({ timestamp, todayPrefix, yesterdayPrefix })}
    </Typography>
  );
};
