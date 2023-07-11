import { Chain } from 'domains/chains/types';
import { useChainIcon } from 'uiKit/hooks/useChainIcon';
import { useChainLogoStyles } from './ChainLogoStyles';

export interface ChainLogoProps {
  chain: Chain;
  className?: string;
  size?: number;
}

export const ChainLogo = ({
  chain: { id, name },
  size,
  className,
}: ChainLogoProps) => {
  const { classes, cx } = useChainLogoStyles(size);

  const icon = useChainIcon(id);

  return icon ? (
    <img
      alt={`${name} logo`}
      className={cx(classes.chainLogo, className)}
      src={icon}
    />
  ) : null;
};
