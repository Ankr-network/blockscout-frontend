import { t } from '@ankr.com/common';
import { Redirect } from 'react-router-dom';

import { ProgressStep } from 'modules/common/components/ProgressStep';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';

import { useMainDataBSC } from './useMainDataBSC';

export const Main = (): JSX.Element => {
  const {
    amount,
    isLoading,
    destination,
    token,
    transactionId,
    isPending,
    handleAddTokenToWallet,
  } = useMainDataBSC();

  if (!token || !transactionId) {
    return <Redirect to={DashboardRoutes.dashboard.generatePath()} />;
  }

  return (
    <ProgressStep
      amount={amount}
      buttonTitle={t('convert.add-to-wallet', { token })}
      destinationAddress={destination}
      hint={t('convert.description', { token })}
      isLoading={isLoading}
      isPending={isPending}
      symbol={token}
      title={t('convert.title')}
      txHash={transactionId}
      onAddTokenToWallet={handleAddTokenToWallet}
    />
  );
};
