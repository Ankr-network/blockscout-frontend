import { Box, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { TableVariant } from '../../types';
import { useEmptyMessageStyles } from './EmptyMessageStyles';

export interface EmptyMessageProps {
  variant: TableVariant;
}

const messagesMap: Record<TableVariant, string> = {
  [TableVariant.Default]: t('chain-item.usage-data.last-requests.empty'),
  [TableVariant.Integrated]: t(
    'chain-item.usage-data.last-requests.integrated-empty',
  ),
};

export const EmptyMessage = ({ variant }: EmptyMessageProps) => {
  const { classes } = useEmptyMessageStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.message} variant="body2">
        {messagesMap[variant]}
      </Typography>
    </Box>
  );
};
