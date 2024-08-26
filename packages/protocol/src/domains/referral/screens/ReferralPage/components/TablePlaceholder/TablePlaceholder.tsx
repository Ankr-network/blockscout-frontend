import { Box, Typography } from '@mui/material';
import { NoDataCoinStack } from '@ankr.com/ui';

import { CopyReferralLinkButton } from '../CopyReferralLinkButton';
import { useTablePlaceholderStyles } from './useTablePlaceholderStyles';

export interface ITablePlaceholderProps {
  hasCopyLinkButton?: boolean;
  text: string;
}

export const TablePlaceholder = ({
  hasCopyLinkButton,
  text,
}: ITablePlaceholderProps) => {
  const { classes } = useTablePlaceholderStyles();

  return (
    <Box className={classes.root}>
      <NoDataCoinStack className={classes.icon} size={28} />
      <Typography className={classes.text} variant="body3">
        {text}
      </Typography>
      {hasCopyLinkButton && (
        <CopyReferralLinkButton className={classes.copyLinkButton} />
      )}
    </Box>
  );
};
