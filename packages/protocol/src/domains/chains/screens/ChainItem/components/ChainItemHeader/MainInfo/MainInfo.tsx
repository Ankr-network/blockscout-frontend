import { INodeEntity } from 'multirpc-sdk';
import { useMemo } from 'react';

import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { ArchiveLabel } from 'modules/common/components/ChainMainInfo/ArchiveLabel';
import { useStyles } from './MainInfoStyles';

interface MainInfoProps {
  coinName: string;
  icon: string;
  nodes?: INodeEntity[];
  name: string;
}

export const MainInfo = ({ coinName, name, icon, nodes }: MainInfoProps) => {
  const classes = useStyles();

  const hasArchiveNodes = useMemo(
    () => nodes?.some(item => item.isArchive),
    [nodes],
  );

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
