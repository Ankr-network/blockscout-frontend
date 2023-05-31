import { Chain } from 'domains/chains/types';
import { useChainIcon } from 'uiKit/hooks/useChainIcon';
import { useChainLogoStyles } from './ChainLogoStyles';

export interface ChainLogoProps {
  chain: Chain;
  className?: string;
}

export const ChainLogo = ({
  chain: { id, name },
  className,
}: ChainLogoProps) => {
  const { classes, cx } = useChainLogoStyles();

  const icon = useChainIcon(id);

  return icon ? (
    <img
      alt={`${name} logo`}
      className={cx(classes.chainLogo, className)}
      src={icon}
    />
  ) : null;
};
