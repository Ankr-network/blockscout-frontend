import { Divider, Statistic } from 'antd';
import { observer } from 'mobx-react';
import { IBalancesEntity, Web3Address } from 'multirpc-sdk';
import { renderBalance } from 'utils/renderBalance';
import { IUseClientInfoParams, useClientInfo } from './useClientInfo';
import { usePremiumPlanClients } from 'stores/usePremiumPlanClients';
import { UserTypeTag } from '../UserTypeTag';

interface IClientInfoProps extends IUseClientInfoParams {
  amountCredits?: IBalancesEntity['amount'];
  amountAnkr?: IBalancesEntity['amountAnkr'];
  amountUsd?: IBalancesEntity['amountUsd'];
  voucherAmount?: IBalancesEntity['voucherAmount'];
  address: Web3Address;
}

export const ClientInfo = observer(
  ({
    amountAnkr,
    amountUsd,
    amountCredits,
    voucherAmount,
    address,
  }: IClientInfoProps) => {
    const { isEmailLoading, email } = useClientInfo({ address });
    const { items, isLoading } = usePremiumPlanClients();
    const currentClient = items.filter(client => client.address === address);
    return (
      <>
        {isLoading ? (
          <>
            Loading... <br />
          </>
        ) : (
          currentClient.map(client => {
            return (
              <>
                <br />
                <UserTypeTag
                  clientType={client.type}
                  clientTtl={client.ttl}
                  isTextInline
                />
                <br />
                <>Created: {client.createdAt.toLocaleDateString()}</>
                <br />
                <>user token: {client.user}</>
                <br />
              </>
            );
          })
        )}
        <Divider />
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

          <Statistic
            title="Email"
            value={email ?? '-'}
            loading={isEmailLoading}
          />
        </section>
      </>
    );
  },
);
