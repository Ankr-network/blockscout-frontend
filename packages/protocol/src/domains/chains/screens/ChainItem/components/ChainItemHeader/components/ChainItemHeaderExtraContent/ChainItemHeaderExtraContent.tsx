import { Button } from '@mui/material';
import { Code } from '@ankr.com/ui';
import { useMemo } from 'react';

import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { EndpointGroup } from 'modules/endpoints/types';
import { Chain, ChainSubType, ChainType } from 'modules/chains/types';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { isEVMBased } from 'domains/chains/utils/isEVMBased';
import { useAppSelector } from 'store/useAppSelector';
import { selectSubChainIdsByChainId } from 'modules/chains/store/selectors';

import { ChainDocsLink } from '../ChainDocsLink';
import { chainItemHeaderExtraContentTranslation } from './translation';
import { useChainItemHeaderExtraContentStyles } from './useChainItemHeaderStyles';

interface IChainItemHeaderExtraContentProps {
  chain: Chain;
  chainSubType?: ChainSubType;
  chainType: ChainType;
  group: EndpointGroup;
  hasMetamaskButton?: boolean;
  isCompactView?: boolean;
  isEnterprise: boolean;
  onOpenCodeExample?: () => void;
}

export const ChainItemHeaderExtraContent = ({
  chain,
  chainSubType,
  chainType,
  group,
  hasMetamaskButton,
  isCompactView,
  isEnterprise,
  onOpenCodeExample,
}: IChainItemHeaderExtraContentProps) => {
  const { keys, t } = useTranslation(chainItemHeaderExtraContentTranslation);

  const { classes } = useChainItemHeaderExtraContentStyles();

  const { id } = chain;

  const allSubChainIds = useAppSelector(state =>
    selectSubChainIdsByChainId(state, id),
  );

  const hasEvmCompatibleSubChains = useMemo(
    () => allSubChainIds.some(isEVMBased),
    [allSubChainIds],
  );

  if (!isCompactView) return null;

  return (
    <div className={classes.extraContent}>
      <Button
        onClick={onOpenCodeExample}
        variant="outlined"
        size="small"
        className={classes.codeExampleButton}
        disabled={!hasEvmCompatibleSubChains}
      >
        <Code />
        {t(keys.codeExample)}
      </Button>

      <ChainDocsLink
        id={id}
        size="small"
        className={classes.docsLink}
        isTextHidden
      />
      {hasMetamaskButton && (
        <AddNetworkButton
          chainType={chainType}
          chainSubType={chainSubType}
          className={classes.addNetworkButton}
          group={group}
          chain={chain}
          isEnterprise={isEnterprise}
          size="small"
        />
      )}
    </div>
  );
};
