import { Statistic } from 'antd';
import { IBalancesEntity, Web3Address } from 'multirpc-sdk';
import { renderBalance } from 'utils/renderBalance';
import { IUseClientInfoParams, useClientInfo } from './useClientInfo';

interface IClientInfoProps extends IUseClientInfoParams {
  amountCredits?: IBalancesEntity['amount'];
  amountAnkr?: IBalancesEntity['amountAnkr'];
  amountUsd?: IBalancesEntity['amountUsd'];
  voucherAmount?: IBalancesEntity['voucherAmount'];
  address: Web3Address;
}

export const ClientInfo = ({
  amountAnkr,
  amountUsd,
  amountCredits,
  voucherAmount,
  address,
}: IClientInfoProps) => {
  const { isEmailLoading, email } = useClientInfo({ address });

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
        value={renderBalance(amountAnkr)}
        loading={!amountAnkr}
      />

      <Statistic
        title="Balance in USD"
        value={renderBalance(amountUsd)}
        loading={!amountUsd}
      />

      <Statistic
        title="Balance in Credits"
        value={renderBalance(amountCredits)}
        loading={!amountCredits}
      />

      <Statistic
        title="Voucher Credits balance"
        value={renderBalance(voucherAmount)}
        loading={!voucherAmount}
      />

      <Statistic title="Email" value={email ?? '-'} loading={isEmailLoading} />
    </section>
  );
};
