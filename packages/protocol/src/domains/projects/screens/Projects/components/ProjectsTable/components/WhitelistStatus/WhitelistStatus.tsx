import { Skeleton, Typography } from '@mui/material';
import { WhitelistItem } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { Placeholder } from 'modules/common/components/Placeholder';

import { useWhitelistStatusStyles } from './useWhitelistStatusStyles';

export interface WhitelistStatusProps {
  isLoading?: boolean;
  whitelist: WhitelistItem[];
}

export const WhitelistStatus = ({
  isLoading = false,
  whitelist,
}: WhitelistStatusProps) => {
  const isWhitelistEmpty = useMemo(
    () => !whitelist.some(({ list }) => list.length > 0),
    [whitelist],
  );

  const label = isWhitelistEmpty
    ? t('projects.list-project.not-implemented')
    : t('projects.list-project.implemented');

  const { classes } = useWhitelistStatusStyles();

  return (
    <Placeholder
      hasPlaceholder={isLoading}
      placeholder={<Skeleton width={100} height={24} variant="rounded" />}
    >
      <Typography className={classes.root} component="div">
        {label}
      </Typography>
    </Placeholder>
  );
};
