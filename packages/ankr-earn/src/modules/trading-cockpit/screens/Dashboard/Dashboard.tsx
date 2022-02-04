import { Box } from '@material-ui/core';
import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { t } from 'modules/i18n/utils/intl';
import { FairValue } from 'modules/trading-cockpit/components/FairValue';
import { Header } from 'modules/trading-cockpit/components/Header';
import { TableComponent } from 'modules/trading-cockpit/components/Table';
import { TokenForm } from 'modules/trading-cockpit/components/TokenForm';
import { getPairedToken } from 'modules/trading-cockpit/utils/getPairedToken';
import { useDefaultFormState } from './hooks/useDefaultFormState';
import { useErrorMessage } from './hooks/useErrorMessage';
import { useFairValue } from './hooks/useFairValue';
import { useTable } from './hooks/useTable';
import { useTokenForm } from './hooks/useTokenForm';
import { NoReactSnap } from '../../../common/components/NoReactSnap';

export const Dashboard = () => {
  const { defaultAmount, defaultFromToken, defaultToToken } =
    useDefaultFormState();

  const { amount, fromToken, toToken, options, isLoading, handleSubmit } =
    useTokenForm({
      defaultAmount,
      defaultFromToken,
      defaultToToken,
    });

  const {
    fairValue,
    tooltip,
    isLoading: isFairValueLoading,
  } = useFairValue(fromToken, toToken);

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
            defaultFromToken={defaultFromToken}
            defaultToToken={defaultToToken}
            disabled={isLoading}
            getPairedOption={getPairedToken}
            defaultAmount={defaultAmount}
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
        <NoReactSnap>
          <Box mb={3}>
            <ErrorMessage
              title={t('error.some')}
              onClick={repeatFailedRequests}
              isLoading={isFailedRequestsLoading}
            />
          </Box>
        </NoReactSnap>
      ) : (
        <NoReactSnap>
          <TableComponent
            isLoading={isLoading}
            data={data}
            outToken={toToken}
          />
        </NoReactSnap>
      )}
    </>
  );
};
