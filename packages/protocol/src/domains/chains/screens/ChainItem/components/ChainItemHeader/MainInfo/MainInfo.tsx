import React, { useMemo } from 'react';
import { INodeEntity } from 'multirpc-sdk';

import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { ArchiveLabel } from 'modules/common/components/ChainMainInfo/ArchiveLabel';
import { useStyles } from './MainInfoStyles';
import {
  getChainCoin,
  TChainName,
} from 'domains/chains/screens/Chains/components/ChainsList/ChainsListUtils';

interface MainInfoProps {
  icon: string;
  nodes?: INodeEntity[];
  name: string;
}

export const MainInfo = ({ name, icon, nodes }: MainInfoProps) => {
  const classes = useStyles();

  const hasArchiveNodes = useMemo(
    () => nodes?.some(item => item.isArchive),
    [nodes],
  );

  const coinName = getChainCoin(name as TChainName);

  return (
    <ChainMainInfo
      logoSrc={icon}
      name={name}
      description={
        <div className={classes.description}>
          <ChainRequestsLabel
            description={coinName}
            descriptionColor="textSecondary"
          />
          {hasArchiveNodes && <ArchiveLabel className={classes.archive} />}
        </div>
      }
    />
  );
};
