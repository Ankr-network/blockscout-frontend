import { Button } from '@mui/material';
import { Code } from '@ankr.com/ui';

import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { Chain } from 'modules/chains/types';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { ChainDocsLink } from '../ChainDocsLink';
import { chainItemHeaderExtraContentTranslation } from './translation';
import { useChainItemHeaderExtraContentStyles } from './useChainItemHeaderStyles';
import { useChainItemHeaderExtraContent } from './useChainItemHeaderExtraContent';

interface IChainItemHeaderExtraContentProps {
  chain: Chain;
  hasMetamaskButton?: boolean;
  isCodeExampleHidden?: boolean;
  hasSelectorForMetamaskButton?: boolean;
  isEnterprise: boolean;
  onOpenCodeExample?: () => void;
}

export const ChainItemHeaderExtraContent = ({
  chain,
  hasMetamaskButton,
  hasSelectorForMetamaskButton,
  isCodeExampleHidden,
  isEnterprise,
  onOpenCodeExample,
}: IChainItemHeaderExtraContentProps) => {
  const { isCodeExampleDisabled } = useChainItemHeaderExtraContent(
    chain,
    onOpenCodeExample,
  );

  const { keys, t } = useTranslation(chainItemHeaderExtraContentTranslation);

  const { classes } = useChainItemHeaderExtraContentStyles();

  return (
    <div className={classes.extraContent}>
      {!isCodeExampleHidden && (
        <Button
          onClick={onOpenCodeExample}
          variant="outlined"
          size="small"
          className={classes.codeExampleButton}
          disabled={isCodeExampleDisabled}
        >
          <Code />
          {t(keys.codeExample)}
        </Button>
      )}
      <ChainDocsLink
        id={chain.id}
        size="small"
        className={classes.docsLink}
        isTextHidden
      />
      {(hasMetamaskButton || hasSelectorForMetamaskButton) && (
        <AddNetworkButton
          className={classes.addNetworkButton}
          chain={chain}
          isEnterprise={isEnterprise}
          size="small"
          hasChainSelector
        />
      )}
    </div>
  );
};
