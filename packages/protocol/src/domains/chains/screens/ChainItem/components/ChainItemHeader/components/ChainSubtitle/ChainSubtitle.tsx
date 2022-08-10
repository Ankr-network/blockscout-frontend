import { ArchiveLabel } from 'modules/common/components/ChainMainInfo/ArchiveLabel';
import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { IApiChain } from 'domains/chains/api/queryChains';
import { MobileChainDocsLink } from '../MobileChainDocsLink';
import { useChainSubtitleStyles } from './ChainSubtitleStyles';

export interface ChainDescriptionProps {
  chain: IApiChain;
  isChainArchived: boolean;
}

export const ChainSubtitle = ({
  chain: { coinName, id },
  isChainArchived,
}: ChainDescriptionProps) => {
  const classes = useChainSubtitleStyles();

  return (
    <div className={classes.chainSubtitle}>
      <ChainRequestsLabel
        descriptionClassName={classes.description}
        description={coinName}
        descriptionColor="textSecondary"
      />
      {isChainArchived && (
        <ArchiveLabel labelClassName={classes.archiveLabel} />
      )}
      <MobileChainDocsLink chainId={id} />
    </div>
  );
};
