import React from 'react';
import classNames from 'classnames';
import { INodeEntity } from 'multirpc-sdk';

import { AddNetworkButton } from 'modules/auth/components/AddNetwork';
import { MainInfo } from './MainInfo';
import { ExclusiveRPCEndpoints } from './ExclusiveRPCEndpoints';
import { PublicRPCEndpoints } from './PublicRPCEndpoints';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchChain } from 'domains/chains/actions/fetchChain';
import { formatChains } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListUtils';

import { useStyles } from './ChainItemHeaderStyles';
import { ExclusiveRPCEndpointsSkeleton } from './ExclusiveRPCEndpoints/ExclusiveRPCEndpointsSkeleton';

interface ChainItemHeaderProps {
  chain: ResponseData<typeof fetchChain>['chain'];
  hasCredentials: boolean;
  icon: string;
  className?: string;
  nodes?: INodeEntity[];
  loading: boolean;
}

export const ChainItemHeader = ({
  chain,
  hasCredentials,
  icon,
  className,
  nodes,
  loading,
}: ChainItemHeaderProps) => {
  const classes = useStyles();

  const [formattedChain] = formatChains([chain]);
  const { name } = chain;

  const exclusivePart = hasCredentials ? <ExclusiveRPCEndpoints /> : null;

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.top}>
        <div className={classes.left}>
          <MainInfo name={name} icon={icon} nodes={nodes} />
          <AddNetworkButton chain={formattedChain} hasPlusIcon />
        </div>
        {hasCredentials || loading ? null : (
          <div className={classes.publicEndpoints}>
            <PublicRPCEndpoints chain={chain} />
          </div>
        )}
      </div>
      {loading ? <ExclusiveRPCEndpointsSkeleton /> : exclusivePart}
    </div>
  );
};
