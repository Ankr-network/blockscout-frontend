import { UserEndpointTokenMode } from 'multirpc-sdk';

import { useAuth } from 'domains/auth/hooks/useAuth';

import { WhitelistItemsCounter } from '../WhitelistItemsCounter';
import { useWhitelistItemsCountersStyles } from './useWhitelistItemsCountersStyles';

export interface WhitelistItemsCountersProps {
  className?: string;
  domainsCount: number;
  ipsCount: number;
  smartContractsCount: number;
}

export const WhitelistItemsCounters = ({
  className,
  domainsCount,
  ipsCount,
  smartContractsCount,
}: WhitelistItemsCountersProps) => {
  const { hasPremium } = useAuth();

  const { classes, cx } = useWhitelistItemsCountersStyles();

  return (
    <div className={cx(classes.root, className)}>
      <WhitelistItemsCounter
        count={domainsCount}
        type={UserEndpointTokenMode.REFERER}
      />
      <WhitelistItemsCounter count={ipsCount} type={UserEndpointTokenMode.IP} />
      {hasPremium && (
        <WhitelistItemsCounter
          count={smartContractsCount}
          type={UserEndpointTokenMode.ADDRESS}
        />
      )}
    </div>
  );
};
