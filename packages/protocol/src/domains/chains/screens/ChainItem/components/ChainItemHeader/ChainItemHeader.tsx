import React from 'react';
import classNames from 'classnames';
import { INodeEntity } from 'multirpc-sdk';

import { AddNetworkButton } from 'modules/auth/components/AddNetwork';
import { MainInfo } from './MainInfo';
import { Preloader } from 'uiKit/Preloader';
import { ExclusiveRPCEndpoints } from './ExclusiveRPCEndpoints';
import { PublicHeader } from './PublicHeader';
import { PublicRPCEndpoints } from './PublicRPCEndpoints';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchChain } from 'domains/chains/actions/fetchChain';
import { formatChains } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListUtils';

import { useStyles } from './ChainItemHeaderStyles';

interface ChainItemHeaderProps {
  chain: ResponseData<typeof fetchChain>['chain'];
  hasCredentials: boolean;
  icon: string;
  chainId: string;
  className?: string;
  nodes?: INodeEntity[];
  loading: boolean;
}

export const ChainItemHeader = ({
  chain,
  hasCredentials,
  icon,
  chainId,
  className,
  nodes,
  loading,
}: ChainItemHeaderProps) => {
  const classes = useStyles();

  const [formattedChain] = formatChains([chain]);
  const { rpcLinks, name } = formattedChain;
  const { id } = chain;

  const isNervos = id === 'nervos';

  const exclusivePartPreloader = (
    <div className={classes.preloaderWrapper}>
      <Preloader centered />
    </div>
  );

  const exclusivePart = hasCredentials ? (
    <ExclusiveRPCEndpoints chainId={chainId} />
  ) : (
    <PublicHeader isPlural={rpcLinks.length > 1} />
  );

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.top}>
        <div className={classes.left}>
          <MainInfo
            name={name}
            hasCredentials={hasCredentials}
            icon={icon}
            nodes={nodes}
          />
          <AddNetworkButton chain={formattedChain} hasPlusIcon />
        </div>
        <div className={classes.right}>
          <PublicRPCEndpoints chain={chain} isNervos={isNervos} />
        </div>
      </div>
      {loading ? exclusivePartPreloader : exclusivePart}
    </div>
  );
};
