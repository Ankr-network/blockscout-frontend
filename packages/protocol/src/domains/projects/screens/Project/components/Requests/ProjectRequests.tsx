import { RequestsWidget } from 'modules/common/components/RequestsWidget/RequestsWidget';

import { useRequests } from '../../hooks/useRequests';

interface RequestsProps {
  className?: string;
  isDisabled?: boolean;
}

export const ProjectRequests = ({ className, isDisabled }: RequestsProps) => {
  const {
    isLoading,
    relativeChange,
    requestsChartData,
    requestsCount,
    timeframe,
    timeframeTabs,
  } = useRequests();

  return (
    <RequestsWidget
      isLoading={isLoading}
      relativeChange={relativeChange}
      requestsChartData={requestsChartData}
      requestsCount={requestsCount}
      timeframe={timeframe}
      timeframeTabs={timeframeTabs}
      className={className}
      isDisabled={isDisabled}
    />
  );
};
