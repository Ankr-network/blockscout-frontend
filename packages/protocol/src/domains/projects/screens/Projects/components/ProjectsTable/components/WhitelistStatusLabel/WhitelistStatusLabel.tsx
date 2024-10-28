import { Skeleton, Typography } from '@mui/material';
import { WhitelistItem } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { Placeholder } from 'modules/common/components/Placeholder';

import { useWhitelistStatusLabelStyles } from './useWhitelistStatusLabelStyles';

export interface IWhitelistStatusLabelProps {
  isLoading: boolean;
  whitelist: WhitelistItem[];
}

export const WhitelistStatusLabel = ({
  isLoading,
  whitelist,
}: IWhitelistStatusLabelProps) => {
  const isWhitelistEmpty = useMemo(
    () => !whitelist.some(({ list }) => list.length > 0),
    [whitelist],
  );

  const label = isWhitelistEmpty
    ? t('projects.list-project.not-implemented')
    : t('projects.list-project.implemented');

  const { classes } = useWhitelistStatusLabelStyles();

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
