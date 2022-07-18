import { Statistic } from 'antd';
import { IBalancesEntity } from 'multirpc-sdk';

interface IClientBalanceProps {
  amountCredits?: IBalancesEntity['amount'];
  amountAnkr?: IBalancesEntity['amountAnkr'];
  amountUsd?: IBalancesEntity['amountUsd'];
  voucherAmount?: IBalancesEntity['voucherAmount'];
}

export const ClientBalance = ({
  amountAnkr,
  amountUsd,
  amountCredits,
  voucherAmount,
}: IClientBalanceProps) => {
  return (
    <section
      style={{
        display: 'grid',
        justifyContent: 'space-between',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '2',
        gridGap: 20,
        marginBottom: 20,
        fontWeight: '500',
      }}
    >
      <Statistic
        title="Balance in ANKR"
        value={amountAnkr}
        loading={!amountAnkr}
      />

      <Statistic
        title="Balance in USD"
        value={amountUsd}
        loading={!amountUsd}
      />

      <Statistic
        title="Balance in Credits"
        value={amountCredits}
        loading={!amountCredits}
      />

      <Statistic
        title="Voucher Credits balance"
        value={voucherAmount}
        loading={!voucherAmount}
      />
    </section>
  );
};
