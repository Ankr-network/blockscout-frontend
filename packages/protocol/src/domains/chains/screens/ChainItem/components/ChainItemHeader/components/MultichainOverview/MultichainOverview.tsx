import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

export const MultiChainOverview = () => {
  return (
    <>
      <Typography variant="h5">
        {t('advanced-api.chain-overview.title')}
      </Typography>
      <Typography variant="body2">
        {t('advanced-api.chain-overview.description')}
      </Typography>
    </>
  );
};
