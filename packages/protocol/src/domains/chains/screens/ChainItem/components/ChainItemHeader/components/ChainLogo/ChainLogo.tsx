import { Chain, ChainID } from 'modules/chains/types';
import { useChainIcon } from 'uiKit/hooks/useChainIcon';

import { useChainLogoStyles } from './ChainLogoStyles';

export interface ChainLogoProps {
  chain: Chain;
  className?: string;
  size?: number;
}

export const ChainLogo = ({
  chain: { id, name },
  className,
  size,
}: ChainLogoProps) => {
  const { classes, cx } = useChainLogoStyles(size);

  const icon = useChainIcon(id);

  if (id === ChainID.ALL_CHAINS || !icon) {
    return null;
  }

  return (
    <img
      alt={`${name} logo`}
      className={cx(classes.chainLogo, className)}
      src={icon}
    />
  );
};
