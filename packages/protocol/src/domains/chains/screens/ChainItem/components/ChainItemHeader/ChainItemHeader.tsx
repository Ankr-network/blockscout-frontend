import React from 'react';
import classNames from 'classnames';
import { INodeEntity } from '@ankr.com/multirpc';

import { Preloader } from 'uiKit/Preloader';
import { fetchChain } from 'domains/chains/actions/fetchChain';
import { formatChains } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListUtils';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { AddNetworkButton } from 'modules/auth/components/AddNetwork';
import { PrivateHeader } from './PrivateHeader';
import { useStyles } from './ChainItemHeaderStyles';
import { MainInfo } from './MainInfo';
import { RpcLinks } from './RpcLinks';
import { PublicHeader } from './PublicHeader';

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
          <RpcLinks rpcLinks={rpcLinks} />
        </div>
      </div>
      {loading ? (
        <div className={classes.preloaderWrapper}>
          <Preloader centered />
        </div>
      ) : hasCredentials ? (
        <PrivateHeader chainId={chainId} />
      ) : (
        <PublicHeader />
      )}
    </div>
  );
};
