import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { Placeholder } from 'modules/common/components/Placeholder';
import { WhitelistItemsCounters } from 'domains/projects/components/WhitelistItemsCounters';
import { useAppSelector } from 'store/useAppSelector';
import { selectHasFreemium } from 'domains/auth/store';

import { ConfigureButton } from './components/ConfigureButton';
import { PaperBlock } from '../PaperBlock';
import { WhitelistItemsCountersSkeleton } from './components/WhitelistItemsCountersSkeleton';
import { useWhitelistCounts } from '../../hooks/useWhitelistCounts';
import { useWhitelistStyles } from './useWhitelistStyles';

interface WhitelistProps {
  className?: string;
}

// freemium configuring was turned off in scope of project page redesign
// but according to users complains we need to turn it on
// details: https://ankrnetwork.atlassian.net/browse/MRPC-5067
const IS_FREEMIUM_CONFIGURING_DISABLED = false;

export const Whitelist = ({ className }: WhitelistProps) => {
  const isFreemium = useAppSelector(selectHasFreemium);

  const { domainsCount, ipsCount, isLoading, smartContractsCount } =
    useWhitelistCounts();

  const isFreemiumConfiguringDisabled =
    IS_FREEMIUM_CONFIGURING_DISABLED && isFreemium;

  const { classes } = useWhitelistStyles();

  return (
    <PaperBlock className={className}>
      <div className={classes.top}>
        <Typography variant="subtitle2" color="textSecondary">
          {t('project.whitelist.title')}
        </Typography>
        <ConfigureButton
          isDisabled={isLoading || isFreemiumConfiguringDisabled}
        />
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
