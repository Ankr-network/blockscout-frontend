import { BalanceTooltip } from '../BalanceTooltip';
import { renderBalance } from './utils/formatBalance';

export interface BalanceProps {
  balance: string;
  className?: string;
}

export const Balance = ({ balance, className }: BalanceProps) => (
  <div className={className}>
    <BalanceTooltip balance={balance}>{renderBalance(balance)}</BalanceTooltip>
  </div>
);
