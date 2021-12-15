import { Box } from '@material-ui/core';
import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { t } from 'modules/i18n/utils/intl';
import { FairValue } from 'modules/trading-cockpit/components/FairValue';
import { Header } from 'modules/trading-cockpit/components/Header';
import { TableComponent } from 'modules/trading-cockpit/components/Table';
import { TokenForm } from 'modules/trading-cockpit/components/TokenForm';
import { AvailableTokens } from 'modules/trading-cockpit/types';
import { getPairedToken } from 'modules/trading-cockpit/utils/getPairedToken';
import { useErrorMessage } from './hooks/useErrorMessage';
import { useFairValue } from './hooks/useFairValue';
import { useTable } from './hooks/useTable';
import { useTokenForm } from './hooks/useTokenForm';

const defaultFormState = {
  defaultAmount: '1',
  defaultFromToken: AvailableTokens.aETHb,
  defaultToToken: AvailableTokens.ETH,
};

export const Dashboard = () => {
  const {
    amount,
    fromToken,
    toToken,
    options,
    isLoading,
    handleSubmit,
  } = useTokenForm({
    defaultAmount: defaultFormState.defaultAmount,
    defaultFromToken: defaultFormState.defaultFromToken,
    defaultToToken: defaultFormState.defaultToToken,
  });

  const { fairValue, tooltip, isLoading: isFairValueLoading } = useFairValue(
    fromToken,
    toToken,
  );

  const {
    hasErrors,
    repeatFailedRequests,
    isLoading: isFailedRequestsLoading,
  } = useErrorMessage({
    fromToken,
    toToken,
    amount: +(amount || 0),
  });

  const { data } = useTable({
    amount: +(amount || 0),
    fairValue,
    fromToken,
    toToken,
  });

  return (
    <>
      <Header
        mb={3}
        formSlot={
          <TokenForm
            onSubmit={handleSubmit}
            options={options}
            defaultFromToken={defaultFormState.defaultFromToken}
            defaultToToken={defaultFormState.defaultToToken}
            disabled={isLoading}
            getPairedOption={getPairedToken}
            defaultAmount={defaultFormState.defaultAmount}
          />
        }
        fairValueSlot={
          <FairValue
            tooltip={tooltip}
            isLoading={isFairValueLoading}
            currencyFirst={{
              amount: '1',
              label: fromToken,
            }}
            currencySecond={{
              amount: `${fairValue}`,
              label: toToken,
            }}
          />
        }
      />

      {hasErrors ? (
        <Box mb={3}>
          <ErrorMessage
            title={t('error.some')}
            onClick={repeatFailedRequests}
            isLoading={isFailedRequestsLoading}
          />
        </Box>
      ) : (
        <TableComponent isLoading={isLoading} data={data} outToken={toToken} />
      )}
    </>
  );
};
