import { Button } from '@mui/material';
import { Code } from '@ankr.com/ui';
import { Chain } from '@ankr.com/chains-list';

import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { GuardResolution } from 'modules/common/components/GuardResolution';

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
        <GuardResolution protectedResolution="xsDown">
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
        </GuardResolution>
      )}
      <ChainDocsLink id={chain.id} size="small" className={classes.docsLink} />
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
