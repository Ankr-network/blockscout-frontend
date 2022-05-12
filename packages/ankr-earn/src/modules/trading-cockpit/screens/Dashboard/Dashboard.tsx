import { Box } from '@material-ui/core';

import { t } from 'common';

import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { FairValue } from 'modules/trading-cockpit/components/FairValue';
import { Header } from 'modules/trading-cockpit/components/Header';
import { TableComponent } from 'modules/trading-cockpit/components/Table';
import { TokenForm } from 'modules/trading-cockpit/components/TokenForm';
import { getPairedToken } from 'modules/trading-cockpit/utils/getPairedToken';

import { NoReactSnap } from '../../../common/components/NoReactSnap';

import { useDefaultFormState } from './hooks/useDefaultFormState';
import { useErrorMessage } from './hooks/useErrorMessage';
import { useFairValue } from './hooks/useFairValue';
import { useTable } from './hooks/useTable';
import { useTokenForm } from './hooks/useTokenForm';

export const Dashboard = (): JSX.Element => {
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
        fairValueSlot={
          <FairValue
            currencyFirst={{
              amount: '1',
              label: fromToken,
            }}
            currencySecond={{
              amount: `${fairValue}`,
              label: toToken,
            }}
            isLoading={isFairValueLoading}
            tooltip={tooltip}
          />
        }
        formSlot={
          <TokenForm
            defaultAmount={defaultAmount}
            defaultFromToken={defaultFromToken}
            defaultToToken={defaultToToken}
            disabled={isLoading}
            getPairedOption={getPairedToken}
            options={options}
            onSubmit={handleSubmit}
          />
        }
        mb={3}
      />

      {hasErrors ? (
        <NoReactSnap>
          <Box mb={3}>
            <ErrorMessage
              isLoading={isFailedRequestsLoading}
              title={t('error.some')}
              onClick={repeatFailedRequests}
            />
          </Box>
        </NoReactSnap>
      ) : (
        <NoReactSnap>
          <TableComponent
            data={data}
            isLoading={isLoading}
            outToken={toToken}
          />
        </NoReactSnap>
      )}
    </>
  );
};
