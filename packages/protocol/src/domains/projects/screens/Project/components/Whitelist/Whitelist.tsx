import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { Placeholder } from 'modules/common/components/Placeholder';
import { WhitelistItemsCounters } from 'domains/projects/components/WhitelistItemsCounters';

import { ConfigureButton } from './components/ConfigureButton';
import { PaperBlock } from '../PaperBlock';
import { WhitelistItemsCountersSkeleton } from './components/WhitelistItemsCountersSkeleton';
import { useWhitelistCounts } from '../../hooks/useWhitelistCounts';
import { useWhitelistStyles } from './useWhitelistStyles';

interface WhitelistProps {
  className?: string;
}

export const Whitelist = ({ className }: WhitelistProps) => {
  const { domainsCount, ipsCount, isLoading, smartContractsCount } =
    useWhitelistCounts();

  const { classes } = useWhitelistStyles();

  return (
    <PaperBlock className={className}>
      <div className={classes.top}>
        <Typography variant="subtitle2">
          {t('project.whitelist.title')}
        </Typography>
        <ConfigureButton isDisabled={isLoading} />
      </div>
      <Placeholder
        hasPlaceholder={isLoading}
        placeholder={<WhitelistItemsCountersSkeleton />}
      >
        <WhitelistItemsCounters
          className={classes.counters}
          domainsCount={domainsCount}
          ipsCount={ipsCount}
          smartContractsCount={smartContractsCount}
        />
      </Placeholder>
    </PaperBlock>
  );
};
