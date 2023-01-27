import { t, tHTML } from '@ankr.com/common';

import { ChainID } from 'modules/chains/types';
import { ChainLabel } from 'modules/common/components/ChainMainInfo/ChainLabel';
import { ChainRequestsLabel } from 'domains/chains/components/ChainsItemBase/components/ChainRequestsLabel';
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
  const { classes } = useChainSubtitleStyles();

  const isSui = id === ChainID.SUI;
  const [label, tooltip] = isSui
    ? [t('chains.beta'), '']
    : [t('chains.archive'), tHTML('chains.archive-tooltip-text')];

  return (
    <div className={classes.chainSubtitle}>
      <ChainRequestsLabel
        descriptionClassName={classes.description}
        description={coinName}
        descriptionColor="textSecondary"
      />
      {(isChainArchived || isSui) && (
        <ChainLabel
          label={label}
          labelClassName={classes.archiveLabel}
          tooltip={tooltip}
        />
      )}
      <MobileChainDocsLink chainId={id} />
    </div>
  );
};
