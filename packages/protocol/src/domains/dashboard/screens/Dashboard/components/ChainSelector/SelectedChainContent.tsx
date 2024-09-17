import { Chain } from '@ankr.com/chains-list';

import { useChainIcon } from 'uiKit/hooks/useChainIcon';

import { SelectedContent } from './SelectedContent';
import { useChainSelectorStyles } from './useChainSelectorStyles';

interface ISelectedChainContentProps {
  chain: Chain;
}

export const SelectedChainContent = ({ chain }: ISelectedChainContentProps) => {
  const { classes } = useChainSelectorStyles();

  const icon = useChainIcon(chain.id);

  return (
    <SelectedContent>
      <img src={icon} alt={chain.name} className={classes.icon} />
      {chain.name}
    </SelectedContent>
  );
};
