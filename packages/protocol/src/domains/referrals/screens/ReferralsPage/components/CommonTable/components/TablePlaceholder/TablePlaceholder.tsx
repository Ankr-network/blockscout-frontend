import { Box, Typography } from '@mui/material';
import { NoDataCoinStack } from '@ankr.com/ui';

import { CopyReferralLinkButton } from 'domains/referrals/screens/ReferralsPage/components/CopyReferralLinkButton';

import { useTablePlaceholderStyles } from './useTablePlaceholderStyles';

export interface ITablePlaceholderProps {
  className?: string;
  hasCopyLinkButton?: boolean;
  text: string;
}

export const TablePlaceholder = ({
  className,
  hasCopyLinkButton,
  text,
}: ITablePlaceholderProps) => {
  const { classes, cx } = useTablePlaceholderStyles();

  return (
    <Box className={cx(classes.root, className)}>
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
